from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from models.donation import db


class AdminUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default="Content Manager")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100))
    content = db.Column(db.Text, nullable=False)
    cover_image = db.Column(db.String(255))
    pdf_url = db.Column(db.String(255))
    status = db.Column(db.String(20), default="draft")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class NewsletterSubscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class GalleryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class EventItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    event_date = db.Column(db.String(50))
    event_time = db.Column(db.String(50))
    venue = db.Column(db.String(200))
    description = db.Column(db.Text)
    poster_url = db.Column(db.String(255))
    registration_link = db.Column(db.String(255))
    published = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class VolunteerApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30))
    message = db.Column(db.Text)
    status = db.Column(db.String(20), default="pending")
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    message = db.Column(db.Text)
    resolved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class SiteSetting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    org_name = db.Column(db.String(200))
    mission = db.Column(db.Text)
    vision = db.Column(db.Text)
    contact_email = db.Column(db.String(120))
    phone = db.Column(db.String(40))
    bank_details = db.Column(db.Text)
    mpesa_info = db.Column(db.Text)
