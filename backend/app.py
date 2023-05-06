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

# Will be implemented after we complete db_connection.py 
@app.route('/api/users', methods=['POST'])
def create_user():
    pass

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    pass

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    pass

# Login route
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    token = auth_instance.generate_jwt(email, password)
    if token:
        return make_response(jsonify({'message': 'Token generated', 'token':token}), 200)
    else:
        return make_response(jsonify({'error': 'Authentication failed'}), 401)

if __name__ == '__main__':
    app.run()
