import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    # Pesapal credentials
    PESAPAL_CONSUMER_KEY = os.getenv("PESAPAL_CONSUMER_KEY")
    PESAPAL_CONSUMER_SECRET = os.getenv("PESAPAL_CONSUMER_SECRET")
    PESAPAL_NOTIFICATION_ID = os.getenv("PESAPAL_NOTIFICATION_ID")

    # Frontend URL
    FRONTEND_URL = "https://tumaini-sickle-cell-organization.vercel.app"

    # Environment
    ENVIRONMENT = "live"

    # Pesapal callback
    CALLBACK_URL = (
        "https://tumaini-sickle-cell-organization.vercel.app/payment-success"
    )

    # Backend IPN URL
    IPN_URL = (
        "https://tumaini-sickle-cell-organization.onrender.com/api/ipn"
    )