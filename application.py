import os
import requests

from flask import Flask, session, render_template
from flask_socketio import SocketIO, emit
from flask_session import Session

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app, manage_session=False)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
	pythontext = "Hello World"
	return render_template("index.html", text=pythontext)

if __name__ == '__main__':
    app.run(debug=True)