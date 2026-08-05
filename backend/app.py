import json
import sqlite3
from pathlib import Path

from flask import Flask, jsonify, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).parent
DB_PATH = BASE_DIR / "content.db"
HOME_CONTENT_FILE = BASE_DIR / "default_home_content.json"
EVENTS_CONTENT_FILE = BASE_DIR / "default_events_content.json"


def load_default_content(file_path, fallback=None):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return fallback if fallback is not None else {}
    except json.JSONDecodeError:
        return fallback if fallback is not None else {}


DEFAULT_HOME_CONTENT = load_default_content(HOME_CONTENT_FILE, {})
DEFAULT_EVENTS_CONTENT = load_default_content(EVENTS_CONTENT_FILE, {})
CONTENT_KEYS = {"home", "events", "about", "blog", "contact", "gallery", "programs"}


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS content (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
        """
    )
    connection.commit()
    ensure_content_key(connection, "home", DEFAULT_HOME_CONTENT)
    ensure_content_key(connection, "events", DEFAULT_EVENTS_CONTENT)

    # Ensure other content keys exist with empty defaults so frontend can query them.
    for key in CONTENT_KEYS - {"home", "events"}:
        ensure_content_key(connection, key, {})
    connection.close()


def ensure_content_key(connection, key, default_value):
    cursor = connection.execute("SELECT 1 FROM content WHERE key = ?", (key,))
    if cursor.fetchone() is None:
        connection.execute(
            "INSERT INTO content (key, value) VALUES (?, ?)",
            (key, json.dumps(default_value, ensure_ascii=False)),
        )
        connection.commit()


def read_content(key, default_value):
    connection = get_connection()
    row = connection.execute("SELECT value FROM content WHERE key = ?", (key,)).fetchone()
    connection.close()
    if row:
        try:
            return json.loads(row["value"])
        except json.JSONDecodeError:
            return default_value
    return default_value


def save_content(key, value):
    connection = get_connection()
    connection.execute(
        "REPLACE INTO content (key, value) VALUES (?, ?)",
        (key, json.dumps(value, ensure_ascii=False)),
    )
    connection.commit()
    connection.close()


# Initialize the database when this module is imported.
initialize_database()


@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "ok", "message": "Tumaini Sickle Cell Organization backend is running."})


@app.route("/api/status", methods=["GET"])
def status():
    return jsonify({"status": "ok", "service": "backend", "version": "1.0"})


@app.route("/api/content/home", methods=["GET", "PUT", "POST"])
def home_content():
    if request.method == "GET":
        return jsonify(read_content("home", DEFAULT_HOME_CONTENT))

    if not request.is_json:
        abort(400, "Expected JSON payload")

    payload = request.get_json()
    save_content("home", payload)
    return jsonify(payload)


@app.route("/api/content/events", methods=["GET", "PUT", "POST"])
def events_content():
    if request.method == "GET":
        return jsonify(read_content("events", DEFAULT_EVENTS_CONTENT))

    if not request.is_json:
        abort(400, "Expected JSON payload")

    payload = request.get_json()
    save_content("events", payload)
    return jsonify(payload)


@app.route("/api/content/<key>", methods=["GET", "PUT", "POST"])
def generic_content(key):
    if key not in CONTENT_KEYS:
        abort(404, f"Content key '{key}' is not supported.")

    default_values = {
        "home": DEFAULT_HOME_CONTENT,
        "events": DEFAULT_EVENTS_CONTENT,
        "about": {},
        "blog": {},
        "contact": {},
        "gallery": {},
        "programs": {},
    }

    if request.method == "GET":
        return jsonify(read_content(key, default_values.get(key, {})))

    if not request.is_json:
        abort(400, "Expected JSON payload")

    payload = request.get_json()
    save_content(key, payload)
    return jsonify(payload)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
