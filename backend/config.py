import os
from dotenv import load_dotenv

load_dotenv()

print("Notification ID:", os.getenv("PESAPAL_NOTIFICATION_ID"))
class Config:

    # ==========================
    # Pesapal Credentials
    # ==========================
    PESAPAL_CONSUMER_KEY = os.getenv("PESAPAL_CONSUMER_KEY")
    PESAPAL_CONSUMER_SECRET = os.getenv("PESAPAL_CONSUMER_SECRET")
    PESAPAL_NOTIFICATION_ID = os.getenv("PESAPAL_NOTIFICATION_ID")

    # ==========================
    # Environment
    # ==========================
    ENVIRONMENT = "live"      # Change to "sandbox" when testing

    # ==========================
    # URLs
    # ==========================
    FRONTEND_URL = "https://tumaini-sickle-cell-organization.vercel.app"

    CALLBACK_URL = f"{FRONTEND_URL}/payment-success"

    IPN_URL = "https://tumaini-sickle-cell-organization.onrender.com/api/ipn"

    # ==========================
    # Pesapal API URL
    # ==========================
    if ENVIRONMENT == "live":
        PESAPAL_API_URL = "https://pay.pesapal.com/v3/api"
    else:
        PESAPAL_API_URL = "https://cybqa.pesapal.com/pesapalv3/api"