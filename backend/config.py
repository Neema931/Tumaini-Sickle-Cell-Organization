import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PESAPAL_CONSUMER_KEY = os.getenv("PESAPAL_CONSUMER_KEY")
    PESAPAL_CONSUMER_SECRET = os.getenv("PESAPAL_CONSUMER_SECRET")
    FRONTEND_URL = "https://tumaini-sickle-cell-organization.vercel.app/"
    ENVIRONMENT = "sandbox"

    CALLBACK_URL = "http://localhost:5173/payment-success"

    
    