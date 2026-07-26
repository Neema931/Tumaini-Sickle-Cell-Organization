import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PESAPAL_CONSUMER_KEY = os.getenv("PESAPAL_CONSUMER_KEY")
    PESAPAL_CONSUMER_SECRET = os.getenv("PESAPAL_CONSUMER_SECRET")

    ENVIRONMENT = "sandbox"

    CALLBACK_URL = "http://localhost:5173/payment-success"

    print("KEY:", PESAPAL_CONSUMER_KEY)
    print("SECRET:", PESAPAL_CONSUMER_SECRET)
    