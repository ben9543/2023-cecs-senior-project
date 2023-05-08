from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from auth.auth import Auth
from users.users import Users

# Create Flask app
app = Flask(__name__)

# Allow Cross Origin from anywhere (will be restricted in prod)
CORS(app)

# Should create db instance later
db = {}

# Creating Users
users_instance = Users(db)

# Creating auth instance
auth_instance = Auth(db, users_instance)

# Constants
AUTH_HEADER_KEY  = 'Authorization'

# Protect routes
def login_required(func):
    def secure_function(*args, **kwargs):
        if(not AUTH_HEADER_KEY in request.headers):
            return make_response(jsonify({'error': 'Authorization header missing'}), 401)
        token = request.headers.get(AUTH_HEADER_KEY)
        if not token:
            return make_response(jsonify({'error': 'Token is missing'}), 401)
        if auth_instance.verify_token(token):
            return func(*args, **kwargs)
        else:
            return make_response(jsonify({'error': 'Authentication failed (invalid token)'}), 401)
    secure_function.__name__ = func.__name__
    return secure_function

""" Users Routes """

# GET all users
@app.route('/api/users', methods=['GET'])
@login_required
def get_users():
    data = users_instance.get_users()
    return make_response(jsonify({"message": "Success", "response":data}), 200)

# GET user by ID
@app.route('/api/users/<int:user_id>', methods=['GET'])
@login_required
def get_user(user_id):
    user = users_instance.get_user(user_id)
    if(user):
        return make_response(jsonify({"message":"Success", "response":user}),200)
    else:
        return make_response(jsonify({"error": "No such user with the given id."}), 404)

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    pass

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    pass

# Sign Up
@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json.get('name')
    email = request.json.get('email')
    college = request.json.get('college')
    password = request.json.get('password')

    # Check if user already exists
    if users_instance.find_user_by_email(email):
        return make_response(jsonify({'message': 'User already exists'}), 409)

    # Create user
    user = {'id': users_instance.count_users() + 1, 'username': username, 'email': email, 'college': college, 'password': password}
    users_instance.add_user(user)

    # Return success response
    return make_response(jsonify({'message': 'User created successfully'}), 201)

# Login route
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    token = auth_instance.generate_jwt(email, password)
    if token:
        return jsonify({'token': token.decode('utf-8'), 'authenticated': True}), 200
    else:
        return jsonify({'message': 'Invalid credentials', 'authenticated': False}), 401

if __name__ == '__main__':
    app.run()
