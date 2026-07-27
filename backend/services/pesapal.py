import requests
from config import Config

BASE_URL = "https://pay.pesapal.com/v3/api"


def get_access_token():
    url = f"{BASE_URL}/Auth/RequestToken"

    payload = {
        "consumer_key": Config.PESAPAL_CONSUMER_KEY,
        "consumer_secret": Config.PESAPAL_CONSUMER_SECRET,
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    response = requests.post(url, json=payload, headers=headers)

    print("AUTH STATUS:", response.status_code)
    print("AUTH RESPONSE:", response.text)

    response.raise_for_status()

    data = response.json()

    if "token" not in data:
        raise Exception(f"Failed to authenticate with Pesapal: {data}")

    return data["token"]


def register_ipn():
    token = get_access_token()

    url = f"{BASE_URL}/URLSetup/RegisterIPN"

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}",
    }

    payload = {
        "url": Config.IPN_URL,
        "ipn_notification_type": "POST",
    }

    response = requests.post(url, json=payload, headers=headers)

    print("IPN STATUS:", response.status_code)
    print("IPN RESPONSE:", response.text)

    response.raise_for_status()

    return response.json()


def submit_order(order_details):
    token = get_access_token()

    url = f"{BASE_URL}/Transactions/SubmitOrderRequest"

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}",
    }

    payload = {
        "id": str(order_details["id"]),
        "currency": "KES",
        "amount": float(order_details["amount"]),
        "description": "Donation to Tumaini Sickle Cell Organization",
        "callback_url": Config.CALLBACK_URL,
        "notification_id": Config.PESAPAL_NOTIFICATION_ID,
        "billing_address": {
            "email_address": order_details["email"],
            "phone_number": order_details["phone"],
            "country_code": "KE",
            "first_name": order_details["first_name"],
            "last_name": order_details["last_name"],
        },
    }

    response = requests.post(url, json=payload, headers=headers)

    print("ORDER STATUS:", response.status_code)
    print("ORDER RESPONSE:", response.text)

    response.raise_for_status()

    response = requests.post(
    url,
    json=payload,
    headers=headers
    )

    print("Pesapal Response:", response.status_code)
    print(response.text)

    return response.json()


def get_transaction_status(order_tracking_id):
    token = get_access_token()

    url = (
        f"{BASE_URL}/Transactions/GetTransactionStatus"
        f"?orderTrackingId={order_tracking_id}"
    )

    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {token}",
    }

    response = requests.get(url, headers=headers)

    print("STATUS CHECK:", response.status_code)
    print("STATUS RESPONSE:", response.text)

    response.raise_for_status()

    return response.json()