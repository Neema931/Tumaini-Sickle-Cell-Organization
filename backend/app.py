from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "ok",
        "message": "Tumaini Sickle Cell Organization backend is running."
    })


@app.route("/api/status", methods=["GET"])
def status():
    return jsonify({
        "status": "ok",
        "service": "backend",
        "version": "1.0"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
