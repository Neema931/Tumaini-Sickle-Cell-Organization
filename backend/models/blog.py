from datetime import datetime
from extensions import db


class Blog(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)

    description = db.Column(db.Text, nullable=False)

    cover_image = db.Column(db.String(255), nullable=False)

    pdf_file = db.Column(db.String(255), nullable=False)

    status = db.Column(
        db.String(50),
        default="Draft"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    def __repr__(self):
        return f"<Blog {self.title}>"