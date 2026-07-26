import os

from flask import Blueprint, request, jsonify

from models.blog import Blog
from extensions import db


blog_bp = Blueprint(
    "blog",
    __name__
)


UPLOAD_FOLDER = "uploads"


@blog_bp.route("/blogs", methods=["POST"])
def create_blog():

    title = request.form.get("title")
    description = request.form.get("description")
    status = request.form.get("status")


    cover = request.files.get("cover")
    pdf = request.files.get("pdf")


    if not cover or not pdf:
        return jsonify({
            "error": "Cover image and PDF required"
        }), 400


    cover_path = os.path.join(
        "uploads/covers",
        cover.filename
    )


    pdf_path = os.path.join(
        "uploads/newsletters",
        pdf.filename
    )


    cover.save(cover_path)
    pdf.save(pdf_path)


    new_blog = Blog(
        title=title,
        description=description,
        cover_image=cover_path,
        pdf_file=pdf_path,
        status=status
    )


    db.session.add(new_blog)
    db.session.commit()


    return jsonify({
        "message": "Newsletter uploaded successfully"
    }), 201