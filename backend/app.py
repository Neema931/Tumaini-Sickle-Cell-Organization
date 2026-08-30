import json
import sqlite3
from pathlib import Path

from flask import Flask, jsonify, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Cache configuration
@app.after_request
def add_header(response):
    if request.path.startswith('/api/'):
        # API responses should not be cached aggressively
        response.cache_control.max_age = 0
        response.cache_control.no_cache = True
    else:
        # Static content can be cached
        response.cache_control.max_age = 3600
    return response

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
DEFAULT_BLOG_CONTENT = {
    "blogs": [
        {
            "id": 1,
            "title": "Quarter 1 Newsletter 2026",
            "description": "Read the latest TSCO updates from the first quarter of 2026.",
            "cover_image": "q1Cover",
            "pdf_url": "pdfQ12026",
        },
        {
            "id": 2,
            "title": "Quarter 2 Newsletter 2026",
            "description": "Stay informed with events, updates, and community news.",
            "cover_image": "q2Cover",
            "pdf_url": "pdfQ22026",
        },
        {
            "id": 3,
            "title": "3rd Edition Newsletter 2025",
            "description": "A special edition newsletter covering TSCO milestones.",
            "cover_image": "thirdCover",
            "pdf_url": "pdf2025",
        },
        {
            "id": 4,
            "title": "Quarter 1 Newsletter 2025",
            "description": "Archive newsletter with updates from early 2025.",
            "cover_image": "Cover",
            "pdf_url": "pdfQ12025",
        },
    ]
}
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
    ensure_content_key(connection, "blog", DEFAULT_BLOG_CONTENT)

    # Ensure other content keys exist with empty defaults so frontend can query them.
    for key in CONTENT_KEYS - {"home", "events", "blog"}:
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
    try:
        connection = get_connection()
        json_value = json.dumps(value, ensure_ascii=False)
        connection.execute(
            "REPLACE INTO content (key, value) VALUES (?, ?)",
            (key, json_value),
        )
        connection.commit()
        print(f"[DEBUG] Saved content for key '{key}': {len(json_value)} bytes")
        connection.close()
    except Exception as e:
        print(f"[ERROR] Failed to save content for key '{key}': {e}")
        raise


# Initialize the database when this module is imported.
initialize_database()


@app.route("/", methods=["GET"])
def index():
    return jsonify({ "status": "ok",
        "message": "THIS IS THE NEW APP.PY",
        "routes": [
            "/api/status",
            "/api/content/home",
            "/api/content/events",
            "/api/content/<key>"
            ]
            })


@app.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "ok", "service": "backend", "version": "1.0"})


@app.route("/content/home", methods=["GET", "PUT", "POST"])
def home_content():
    if request.method == "GET":
        return jsonify(read_content("home", DEFAULT_HOME_CONTENT))

    if not request.is_json:
        abort(400, "Expected JSON payload")

    payload = request.get_json()
    save_content("home", payload)
    return jsonify(payload)


@app.route("/content/events", methods=["GET", "PUT", "POST"])
def events_content():
    if request.method == "GET":
        return jsonify(read_content("events", DEFAULT_EVENTS_CONTENT))

    if not request.is_json:
        abort(400, "Expected JSON payload")

    payload = request.get_json()
    save_content("events", payload)
    return jsonify(payload)


@app.route("/content/<key>", methods=["GET", "PUT", "POST"])
def generic_content(key):
    if key not in CONTENT_KEYS:
        abort(404, f"Content key '{key}' is not supported.")

    default_values = {
        "home": DEFAULT_HOME_CONTENT,
        "events": DEFAULT_EVENTS_CONTENT,
        "blog": DEFAULT_BLOG_CONTENT,
        "about": {},
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
