from flask import Flask
from flask_cors import CORS
from routes.tasks import tasks_bp
import os

app = Flask(__name__)
CORS(app)

app.register_blueprint(tasks_bp)

@app.route("/")
def home():
    return {"message": "API Running"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

@app.route("/test-email")
def test_email():
    from services.email_service import send_email

    send_email(
        "your_email@gmail.com",
        "Railway Test",
        "Testing email"
    )

    return {"success": True}