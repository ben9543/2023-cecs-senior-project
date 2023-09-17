from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from auth.auth import Auth
from users.users import User_API
from studyspots.studyspots import StudySpots_API

# Create a SQLAlchemy engine and connect to your database
user = "postgres"
password = "1234"
hostname = "127.0.0.1:5432"
database_name = "test"
port = "5432"
DATABASE_URI = f"postgresql://{user}:{password}@{hostname}/{database_name}"

# Create Flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
db = SQLAlchemy(app)

# Allow Cross Origin from anywhere (will be restricted in prod)
CORS(app)

# Create Users instance
users_instance = User_API(db)

# Create Studyspot instance
studyspots_instance = StudySpots_API(db)

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
        #print("Payload->>>>>>",token)
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

""" Test Routes """
@app.route('/', methods=['GET'])
def alive():
    return make_response(jsonify({"message": "Success", "response":True}), 200)

""" Users Routes """
# GET all users
# @app.route('/api/users', methods=['GET'])
# @login_required
# def get_users():
#     data = users_instance.get_users()
#     return make_response(jsonify({"message": "Success", "response":data}), 200)

# # GET user by ID
# @app.route('/api/users/<int:user_id>', methods=['GET'])
# @login_required
# def get_user(user_id):
#     user = users_instance.get_user(user_id)
#     if(user):
#         return make_response(jsonify({"message":"Success", "response":user}),200)
#     else:
#         return make_response(jsonify({"error": "No such user with the given id."}), 404)

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
    username = request.json.get('username')
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

@app.route('/user/<string:user_name>', methods=['GET'])
def get_user(user_name):
    # Retrieve user data based on the username from the database
    user = users_instance.get_user_by_username(user_name)

    if user:
        # Return user data as JSON
        return jsonify({
            'user_id': user.user_id,
            'user_name': user.user_name,
            'user_email': user.user_email,
            'university_id': user.university_id
        })
    else:
        return jsonify({'message': 'User not found'}), 404

# Create a route for fetching user data by email
@app.route('/api/users', methods=['GET'])
@login_required
def get_user_by_email():
    email = request.args.get('email')  # Get the email from the query parameters
    print("Email->>>>>", email)
    # Query the database to find the user by email
    user = users_instance.find_user_by_email(email)
          
    if user is not None:
        # If a user with the specified email is found, return their data
        return jsonify({
            'user_name': user.user_name,
            'user_email': user.user_email,
            'university_name': user.university_name
        })
    else:
        # If no user with the specified email is found, return an error message
        return jsonify({'error': 'User not found'}), 404

@app.route('/user/update/<string:user_name>', methods=['PUT'])
def update_user(user_name):
    # Retrieve the user from the database
    user = users_instance.get_user_by_username(user_name)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Get the updated data from the request JSON
    data = request.json
    if 'user_name' in data:
        user.user_name = data['user_name']
    if 'user_email' in data:
        user.user_email = data['user_email']
    if 'university_id' in data:
        user.university_name = data['university_name']

    try:
        # Commit the changes to the database
        db.session.commit()
        return jsonify({'message': 'User data updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error updating user data: {str(e)}'}), 500

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    pass

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    pass

""" StudySpot API """
@app.route('/api/studyspots', methods=['GET', 'POST', 'PUT', 'DELETE'])
def main_studyspot():
    if request.method == 'GET':
        try:
            data = studyspots_instance.get_studyspots()
            print(data)
            return make_response(jsonify({
                    'message': 'OK', 
                    'data': data
                }), 200)
        except:
            return make_response(jsonify({
                'message': 'OK', 
                'data': False
            }), 400)
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
