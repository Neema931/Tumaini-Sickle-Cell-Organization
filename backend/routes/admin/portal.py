import os
from pathlib import Path
from flask import Blueprint, render_template, request, redirect, url_for, session, flash, jsonify
from sqlalchemy import inspect, text, func
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from models.donation import db, Donation
from models.admin import AdminUser, BlogPost, NewsletterSubscriber, GalleryItem, EventItem, VolunteerApplication, ContactMessage, SiteSetting

admin_bp = Blueprint("admin", __name__, template_folder="../../templates/admin")
UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploads" / "blogs"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def ensure_admin_schema():
    inspector = inspect(db.engine)
    columns = {column["name"] for column in inspector.get_columns("admin_user")}
    if "email" not in columns:
        with db.engine.begin() as connection:
            connection.execute(text("ALTER TABLE admin_user ADD COLUMN email VARCHAR(120)"))


def ensure_blog_schema():
    inspector = inspect(db.engine)
    if "blog_post" not in inspector.get_table_names():
        return
    columns = {column["name"] for column in inspector.get_columns("blog_post")}
    if "pdf_url" not in columns:
        with db.engine.begin() as connection:
            connection.execute(text("ALTER TABLE blog_post ADD COLUMN pdf_url VARCHAR(255)"))


def ensure_default_admin():
    ensure_admin_schema()
    ensure_blog_schema()
    user = AdminUser.query.filter_by(email="neemaisabel@gmail.com").first()
    if not user:
        user = AdminUser(
            username="neemaisabel@gmail.com",
            email="neemaisabel@gmail.com",
            password_hash=generate_password_hash("1234"),
            role="Super Administrator",
        )
        db.session.add(user)
    else:
        user.username = "neemaisabel@gmail.com"
        user.email = "neemaisabel@gmail.com"
        user.password_hash = generate_password_hash("1234")
        user.role = "Super Administrator"
    db.session.commit()


def login_required(view):
    from functools import wraps

    @wraps(view)
    def wrapped(*args, **kwargs):
        if "admin_id" not in session:
            if request.path.startswith("/admin/api"):
                return jsonify({"success": False, "message": "Unauthorized"}), 401
            return redirect(url_for("admin.login"))
        return view(*args, **kwargs)

    return wrapped


def save_upload(file_storage):
    if not file_storage or not getattr(file_storage, "filename", None):
        return None
    filename = secure_filename(file_storage.filename)
    target_path = UPLOAD_DIR / filename
    file_storage.save(target_path)
    return f"/uploads/blogs/{filename}"


def serialize_blog(post):
    return {
        "id": post.id,
        "title": post.title,
        "category": post.category,
        "content": post.content,
        "cover_image": post.cover_image,
        "pdf_url": post.pdf_url,
        "status": post.status,
        "created_at": post.created_at.isoformat() if post.created_at else None,
    }


@admin_bp.route("/admin/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        if request.is_json:
            payload = request.get_json(silent=True) or {}
            identifier = (payload.get("email") or payload.get("username") or "").strip()
            password = payload.get("password", "")
        else:
            identifier = (request.form.get("email") or request.form.get("username") or "").strip()
            password = request.form.get("password", "")

        user = AdminUser.query.filter((AdminUser.email == identifier) | (AdminUser.username == identifier)).first()
        if user and check_password_hash(user.password_hash, password):
            session["admin_id"] = user.id
            session["username"] = user.username or user.email
            session["role"] = user.role
            if request.is_json or request.headers.get("Accept", "").startswith("application/json"):
                return jsonify({"success": True, "message": "Login successful"})
            return redirect(url_for("admin.dashboard"))

        if request.is_json or request.headers.get("Accept", "").startswith("application/json"):
            return jsonify({"success": False, "message": "Invalid email or password"}), 401
        error = "Invalid email or password"
    return render_template("login.html", error=error)


@admin_bp.route("/admin/logout")
def logout():
    session.clear()
    return redirect(url_for("admin.login"))


@admin_bp.route("/admin/dashboard")
@login_required
def dashboard():
    metrics = {
        "total_donations": Donation.query.count(),
        "total_donors": Donation.query.distinct(Donation.email).count(),
        "pending_donations": Donation.query.filter_by(status="PENDING").count(),
        "completed_donations": Donation.query.filter_by(status="COMPLETED").count(),
        "subscribers": NewsletterSubscriber.query.count(),
        "blog_posts": BlogPost.query.filter_by(status="published").count(),
        "upcoming_events": EventItem.query.filter_by(published=True).count(),
        "volunteer_applications": VolunteerApplication.query.count(),
    }
    activity = [
        {"type": "Donation", "details": "Latest donation recorded", "status": "New"},
        {"type": "Blog", "details": "New blog post drafted", "status": "Draft"},
        {"type": "Volunteer", "details": "Volunteer application received", "status": "Pending"},
    ]
    return render_template("dashboard.html", metrics=metrics, activity=activity)


@admin_bp.route("/admin/donations", methods=["GET"])
@login_required
def donations():
    q = request.args.get("q", "")
    status = request.args.get("status", "")
    query = Donation.query
    if q:
        query = query.filter((Donation.donor_name.ilike(f"%{q}%")) | (Donation.email.ilike(f"%{q}%")))
    if status:
        query = query.filter_by(status=status)
    donations = query.order_by(Donation.created_at.desc()).all()
    return render_template("donations.html", donations=donations)


@admin_bp.route("/admin/blogs", methods=["GET", "POST"])
@login_required
def blogs():
    if request.method == "POST":
        blog = BlogPost(
            title=request.form.get("title"),
            category=request.form.get("category"),
            content=request.form.get("content"),
            cover_image=request.form.get("cover_image"),
            status=request.form.get("status", "draft")
        )
        db.session.add(blog)
        db.session.commit()
        flash("Blog saved successfully")
        return redirect(url_for("admin.blogs"))
    return render_template("blogs.html")


@admin_bp.route("/admin/api/blogs", methods=["GET", "POST"])
@login_required
def api_blogs():
    if request.method == "POST":
        title = (request.form.get("title") or "").strip()
        description = (request.form.get("description") or request.form.get("content") or "").strip()
        if not title:
            return jsonify({"success": False, "message": "Title is required"}), 400

        status = (request.form.get("status") or "draft").strip().lower()
        status = "published" if status == "published" else "draft"

        cover_url = save_upload(request.files.get("cover"))
        pdf_url = save_upload(request.files.get("pdf"))

        blog = BlogPost(
            title=title,
            category="newsletter",
            content=description,
            cover_image=cover_url,
            pdf_url=pdf_url,
            status=status,
        )
        db.session.add(blog)
        db.session.commit()
        return jsonify({"success": True, "message": "Blog saved successfully", "blog": serialize_blog(blog)})

    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    return jsonify({"success": True, "blogs": [serialize_blog(post) for post in posts]})


@admin_bp.route("/admin/settings", methods=["GET", "POST"])
@login_required
def settings():
    settings_record = SiteSetting.query.first()
    if not settings_record:
        settings_record = SiteSetting()
        db.session.add(settings_record)
        db.session.commit()
    if request.method == "POST":
        settings_record.org_name = request.form.get("org_name")
        settings_record.mission = request.form.get("mission")
        settings_record.vision = request.form.get("vision")
        settings_record.contact_email = request.form.get("contact_email")
        settings_record.phone = request.form.get("phone")
        settings_record.bank_details = request.form.get("bank_details")
        settings_record.mpesa_info = request.form.get("mpesa_info")
        db.session.commit()
        flash("Settings updated")
        return redirect(url_for("admin.settings"))
    return render_template("settings.html", settings=settings_record)


@admin_bp.route("/admin/api/dashboard", methods=["GET"])
@login_required
def api_dashboard():
    total_donations = db.session.query(func.coalesce(func.sum(Donation.amount), 0)).scalar() or 0
    completed_donations = Donation.query.filter_by(status="COMPLETED").count()
    pending_donations = Donation.query.filter_by(status="PENDING").count()
    total_donors = Donation.query.distinct(Donation.email).count()
    recent_donations_query = Donation.query.order_by(Donation.created_at.desc()).limit(5).all()

    recent_donations = [
        {
            "name": donation.donor_name or donation.email or "Anonymous",
            "amount": donation.amount or 0,
            "status": (donation.status or "Pending").title(),
        }
        for donation in recent_donations_query
    ]

    data = {
        "total_donations": float(total_donations),
        "completed_donations": completed_donations,
        "pending_donations": pending_donations,
        "total_donors": total_donors,
        "subscribers": NewsletterSubscriber.query.count(),
        "blog_posts": BlogPost.query.filter_by(status="published").count(),
        "upcoming_events": EventItem.query.filter_by(published=True).count(),
        "volunteer_applications": VolunteerApplication.query.count(),
        "recent_donations": recent_donations,
    }
    return jsonify({"success": True, "dashboard": data})


@admin_bp.route("/admin/init")
def init_admin():
    ensure_default_admin()
    return {"message": "Admin account ready"}
