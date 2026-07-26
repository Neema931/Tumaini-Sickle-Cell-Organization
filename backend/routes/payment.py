from flask import Blueprint, jsonify, request
from models.donation import Donation, db
from services.pesapal import register_ipn, submit_order


payment_bp = Blueprint("payment", __name__)


@payment_bp.route("/ipn", methods=["POST"])
def pesapal_ipn():
    data = request.json or {}

    print("Pesapal IPN Received:")
    print(data)

    tracking_id = data.get("OrderTrackingId")

    if tracking_id:
        donation = Donation.query.filter_by(tracking_id=tracking_id).first()
        if donation:
            donation.status = "COMPLETED"
            db.session.commit()
            print("Donation updated successfully")

    return jsonify({
        "message": "IPN received successfully"
    })


@payment_bp.route("/test")
def test():
    return {
        "status": "Payment routes working"
    }


@payment_bp.route("/donate", methods=["POST"])
def donate():

    data = request.json


    # Create donation record first

    donation = Donation(

        donor_name = (
            data.get("first_name", "")
            + " "
            + data.get("last_name", "")
        ),

        email = data.get("email"),

        phone = data.get("phone"),

        amount = data.get("amount"),

        status = "PENDING"

    )


    db.session.add(donation)

    db.session.commit()



    # Send request to Pesapal

    response = submit_order(data)



    # Save Pesapal tracking ID

    if response.get("order_tracking_id"):

        donation.tracking_id = response.get(
            "order_tracking_id"
        )

        db.session.commit()



    return jsonify(response)