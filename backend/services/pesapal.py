import requests
from config import Config


def get_access_token():
    url = "https://pay.pesapal.com/v3/api/Auth/RequestToken"

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    payload = {
        "consumer_key": Config.PESAPAL_CONSUMER_KEY,
        "consumer_secret": Config.PESAPAL_CONSUMER_SECRET
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()


def register_ipn():
    token_response = get_access_token()
    token = token_response.get("token")

    url = "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN"

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    payload = {
        "url": "http://localhost:5000/api/ipn",
        "ipn_notification_type": "POST"
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()


def submit_order(order_details):
    token_response = get_access_token()
    token = token_response.get("token")

    url = "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest"

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    payload = {
        "id": order_details["id"],
        "currency": "KES",
        "amount": order_details["amount"],
        "description": "Donation to Tumaini Sickle Cell Organization",
        "callback_url": "http://localhost:5173/payment-success",
        "notification_id": order_details["notification_id"],
        "billing_address": {
            "email_address": order_details["email"],
            "phone_number": order_details["phone"],
            "first_name": order_details["first_name"],
            "last_name": order_details["last_name"]
        }
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()