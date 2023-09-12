from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from auth.auth import Auth
from users.users import Users
from studyspots.studyspots import StudySpots

# Create Flask app
app = Flask(__name__)

# Allow Cross Origin from anywhere (will be restricted in prod)
CORS(app)

# Should create db instance later
db = {}

# Create Users instance
users_instance = Users(db)

# Create Studyspot instance
studyspots_instance = StudySpots(db)

# Create auth instance
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

""" Utility Functions """
def parameter_check(data):
    return True

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


@app.route('/api/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    pass

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    pass

""" StudySpot API """
@app.route('/api/studyspots', methods=['GET', 'POST', 'PUT', 'DELETE'])
def create_studyspot():
    if request.method == 'GET':
        return make_response(jsonify({
                'message': 'OK', 
                'data': studyspots_instance.get_studyspots()
            }), 200)
    if request.method == 'POST':
        data = request.get_json(force=True)
        if parameter_check(data):
            return make_response(jsonify({
                    'message': 'Successfully created a studyspot.', 
                    'data': True
                }), 201)
        else:
            return make_response(jsonify({
                    'message': 'Invalid Parmeters.', 
                    'data': False
                }), 201)
    if request.method == 'PUT':
        data = request.get_json(force=True)
        return make_response(jsonify({
                'message': 'Successfully updated the studyspot ', 
                'data': True
            }), 201)
    if request.method == 'DELETE':
        return make_response(jsonify({
                'message': 'Successfully deleted the studyspot', 
                'data': True
            }), 201)


# Studyspot search API
@app.route('/api/studyspots/serach', methods=['POST'])
def search_studyspot():
    pass


# Get a single studyspot by id
@app.route('/api/studyspots/<int:studyspot_id>', methods=['GET'])
def get_studyspot_by_id(studyspot_id):
    studyspot = next((spot for spot in studyspots_instance if spot['id'] == studyspot_id), None)
    if studyspot is not None:
        return jsonify(studyspot)
    else:
        return jsonify({'message': 'Study spot not found'}), 404
        

if __name__ == '__main__':
    app.run()