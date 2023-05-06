from flask import Flask, jsonify, request
from werkzeug.local import LocalProxy
from datetime import datetime, timedelta
from flask_cors import CORS
import hmac
import hashlib
import jwt

from models.user import User

# create the Flask application
app = Flask(__name__)
CORS(app)

# configure the Flask application
app.config['SECRET_KEY'] = 'super-secret'
app.config['JWT_EXPIRATION_DELTA'] = timedelta(seconds=1800)

# define a function to authenticate users
def authenticate(email, password):
    user = User.find_by_email(email)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

# define a function to retrieve a user from its id
def identity(payload):
    user_id = payload['identity']
    return User.find_by_id(user_id, None)

def safe_str_cmp(a, b):
    """Safely compare two strings using HMAC.

    This function takes two strings and compares them in a way that
    prevents timing attacks. It returns True if the strings are equal,
    and False otherwise.
    """
    if isinstance(a, str):
        a = a.encode('utf-8')
    if isinstance(b, str):
        b = b.encode('utf-8')

    # Generate a random key
    key = hashlib.sha256(b'mysecretkey').digest()

    # Compute HMAC of the two strings using the key
    hmac_a = hmac.new(key, a, hashlib.sha256).hexdigest()
    hmac_b = hmac.new(key, b, hashlib.sha256).hexdigest()

    # Compare the HMACs to prevent timing attacks
    return hmac.compare_digest(hmac_a, hmac_b)


# create a LocalProxy instance to get the current app context
app_ctx = LocalProxy(lambda: app.app_context(), unbound_message='outside of application context')

# define a route to obtain JWT tokens
@app.route('/login', methods=['POST'])
def login():
    # get the request data
    data = request.get_json()
    print(data)
    email = data.get('email', None)
    password = data.get('password', None)
    if not email or not password:
        return jsonify({'message': 'Invalid credentials', 'authenticated': False}), 401

    # authenticate the user
    user = authenticate(email, password)
    if not user:
        return jsonify({'message': 'Invalid credentials', 'authenticated': False}), 401

    # generate a JWT token
    payload = {'id': user.id, 'email': user.email}
    secret_key = app.config['SECRET_KEY']
    token = jwt.encode(payload, secret_key)
    expires_in = app.config['JWT_EXPIRATION_DELTA'].total_seconds()
    return jsonify({'token': token.decode('utf-8'), 'expires_in': expires_in, 'authenticated': True}), 200

