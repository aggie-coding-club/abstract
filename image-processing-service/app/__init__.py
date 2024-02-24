from firebase_admin import credentials
import firebase_admin
from flask import Flask
from firebase_admin import auth

app = Flask(__name__)

# Adding firebase credientials to the app
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/signup')
def create_user():
    # auth.create_user(email="test@gmail.com", password="123456")
    return 'User created!'


if __name__ == '__main__':
    app.run()
