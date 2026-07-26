import os
import smtplib
import ssl
from email.message import EmailMessage
from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.payment import payment_bp
from routes.admin.portal import admin_bp, ensure_default_admin
from models.donation import db
from models.admin import AdminUser, BlogPost, NewsletterSubscriber, GalleryItem, EventItem, VolunteerApplication, ContactMessage, SiteSetting


app = Flask(__name__)
app.secret_key = "tsco-admin-secret-key"

CORS(app, supports_credentials=True, resources={r"/*": {"origins": ["https://tumaini-sickle-cell-organization.onrender.com/api", "http://127.0.0.1:5173", "https://tumaini-sickle-cell-organization.vercel.app"]}})
  

app.register_blueprint(payment_bp, url_prefix="/api")

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///donation.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize database
db.init_app(app)

# Register admin routes
app.register_blueprint(admin_bp)

# Create tables and seed the default admin
with app.app_context():
    db.create_all()
    ensure_default_admin()


def send_email(subject, body, recipients, reply_to=None):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    use_tls = os.getenv("SMTP_USE_TLS", "True").lower() in ("true", "1", "yes")

    if not smtp_host or not smtp_user or not smtp_pass:
        raise RuntimeError("SMTP configuration is missing. Set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD.")

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = smtp_user
    message["To"] = ", ".join(recipients)
    if reply_to:
        message["Reply-To"] = reply_to
    message.set_content(body)

    if use_tls:
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls(context=context)
            server.login(smtp_user, smtp_pass)
            server.send_message(message)
    else:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_pass)
            server.send_message(message)


@app.route("/api/contact", methods=["POST"])
def contact_form():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message_text = (data.get("message") or "").strip()

    if not name or not email or not message_text:
        return jsonify({"success": False, "message": "Name, email, and message are required."}), 400

    contact_message = ContactMessage(
        name=name,
        email=email,
        message=message_text,
    )
    with app.app_context():
        db.session.add(contact_message)
        db.session.commit()

    recipients = [
        "neemaisabel@gmail.com",
        "info@tumainisicklecell.org",
    ]

    try:
        subject = f"New contact message from {name}"
        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message_text}"
        send_email(subject, body, recipients, reply_to=email)
    except Exception as exc:
        return jsonify({"success": False, "message": f"Message saved but email delivery failed: {exc}"}), 500

    return jsonify({"success": True, "message": "Thank you — your message has been sent."})


@app.route("/api/blogs")
def public_blogs():
    posts = BlogPost.query.filter_by(status="published").order_by(BlogPost.created_at.desc()).all()
    data = []
    for post in posts:
        data.append({
            "id": post.id,
            "title": post.title,
            "description": post.content,
            "cover_image": post.cover_image,
            "pdf_url": post.pdf_url,
            "created_at": post.created_at.isoformat() if post.created_at else None,
        })
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)