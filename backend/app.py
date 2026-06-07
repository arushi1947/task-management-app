from flask import Flask
from flask_cors import CORS

# Import blueprint
from routes.tasks import tasks_bp

app = Flask(__name__)
CORS(app)

# Register blueprint
app.register_blueprint(tasks_bp)

@app.route("/")
def home():
    return {"message": "API Running"}

if __name__ == "__main__":
    app.run(debug=True)

