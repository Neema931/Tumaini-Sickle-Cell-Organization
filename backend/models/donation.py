from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Donation(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    donor_name = db.Column(
        db.String(100)
    )

    email = db.Column(
        db.String(120)
    )

    phone = db.Column(
        db.String(20)
    )

    amount = db.Column(
        db.Float
    )

    tracking_id = db.Column(
        db.String(200)
    )

    status = db.Column(
        db.String(50),
        default="PENDING"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )