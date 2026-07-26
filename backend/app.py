from flask import Flask
from flask_cors import CORS

from routes.payment import payment_bp
from models.donation import db


app = Flask(__name__)

CORS(app)


# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///donation.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# Initialize database
db.init_app(app)


# Create tables
with app.app_context():
    db.create_all()


# Register payment routes
app.register_blueprint(payment_bp, url_prefix="/api")



@app.route("/")
def home():
    return {
        "message": "TSCO Payment API Running"
    }



if __name__ == "__main__":
    app.run(debug=True)