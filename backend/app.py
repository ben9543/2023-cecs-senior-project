from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from auth.auth import Auth
from users.users import User_API
from studyspots.studyspots import StudySpots_API
from universities.universities import Universities_API
from reviews.reviews import Reviews_API

# Create a SQLAlchemy engine and connect to your database
user = "postgres"
password = "****"
hostname = "127.0.0.1:5432"
database_name = "test"
port = "5432"
DATABASE_URI = f"postgresql://{user}:{password}@{hostname}/{database_name}"

# Create Flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
# Allow Cross Origin from anywhere (will be restricted in prod)
CORS(app)

# Create Users instance
users_instance = User_API(db)

# Create Studyspot instance
studyspots_instance = StudySpots_API(db)

# Create Review instance
reviews_instance = Reviews_API(db)

# Create University instance
universities_instance = Universities_API(db)

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
    user = users_instance.find_user_by_email(email)
    if user:
        stored_hashed_password = user.password.encode('utf-8')
        password_check = bcrypt.check_password_hash(stored_hashed_password, password)
        if password_check:
            token = auth_instance.generate_jwt(email)
            if token:
                return jsonify({'token': token.decode('utf-8'), 'authenticated': True}), 200
                # return jsonify({'token': token, 'authenticated': True}), 200
            else:
                return jsonify({'message': 'Failed to generate a token', 'authenticated': False}), 401
        else:
            return jsonify({'message': 'Invalid password', 'authenticated': False}), 401
                        # return jsonify({'token': token, 'authenticated': True}), 200 #for windows user
    return jsonify({'message': 'Invalid email', 'authenticated': False}), 401



@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json.get('username')
    email = request.json.get('email')
    college = request.json.get('college')
    password = request.json.get('password')

    # Check if user already exists
    if users_instance.find_user_by_email(email):
        return make_response(jsonify({'message': 'User already exists'}), 409)
    # Check if university is in the database
    if universities_instance.get_university_by_name(college) is None:
        return make_response(jsonify({'message': 'College does not exists in our database'}), 409)

    # Hash the user's password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create user
    user = {'id': users_instance.count_users() + 1, 'username': username, 'email': email, 'college': college, 'password': hashed_password}
    users_instance.add_user(user)

    # Return success response
    return make_response(jsonify({'message': 'User created successfully'}), 201)


@app.route('/api/change-password', methods=['OPTIONS'])
@cross_origin()
def handle_preflight_change_pswd():
    return '', 200

@app.route('/api/change-password', methods=['PUT'])
def change_password():
    try:
        user_id = request.json.get('user_id')
        username = request.json.get('user_name')
        email = request.json.get('user_email')
        college = request.json.get('university_name')
        password = request.json.get('password')
        

        new_hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        # Update the user's data in the database
        user = users_instance.update_user_pswd(user_id, username, email, college, new_hashed_password)
        if user:
            # User data updated successfully
            return jsonify({'status': True})

        # If the user does not exist or the update failed
        return jsonify({'status': False}), 404

    except Exception as e:
        # Handle any exceptions (e.g., database errors)
        return jsonify({'error': str(e)}), 500

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
    # Query the database to find the user by email
    user = users_instance.find_user_by_email(email)
          
    if user is not None:
        # If a user with the specified email is found, return their data
        return jsonify({
            'user_id': user.user_id,
            'user_name': user.user_name,
            'user_email': user.user_email,
            'university_name': user.university_name
        })
    else:
        # If no user with the specified email is found, return an error message
        return jsonify({'error': 'User not found'}), 404

# Handle OPTIONS requests for /api/update-user
@app.route('/api/update-user', methods=['OPTIONS'])
@cross_origin()  # Allow cross-origin requests for this route
def handle_preflight():
    return '', 200 

@app.route('/api/check-username', methods=['OPTIONS'])
def handle_preflight_username():
    return '', 200

@app.route('/api/check-email', methods=['OPTIONS'])
def handle_preflight_email():
    return '', 200

# Define an API route for updating user data
@app.route('/api/update-user', methods=['PUT'])  # Use PUT for updating data
@cross_origin()  # Allow cross-origin requests for this route
def update_user():
    try:
        # Get the user data from the request
        data = request.json 

        # Extract user_id and other updated fields from the data
        user_id = int(data.get('user_id'))
        new_username = data.get('username')
        new_email = data.get('email')
        new_college = data.get('university')

        print(user_id, new_username, new_email, new_college)
        # Update the user's data in the database
        user = users_instance.update_user(user_id, new_username, new_email, new_college)
        print("User->>>>>>>>>>>>>>",user)
        if user:
            # User data updated successfully
            return jsonify({'message': 'User data updated successfully'})

        # If the user does not exist or the update failed
        return jsonify({'error': 'User not found or update failed'}), 404

    except Exception as e:
        # Handle any exceptions (e.g., database errors)
        return jsonify({'error': str(e)}), 500

# API route to check if a username is taken
@app.route('/api/check-username', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def check_username_availability():
    data = request.json  # Get the JSON data from the request
    if 'username' not in data:
        return jsonify({'error': 'Username not provided'}), 400

    username_to_check = data['username']
    current_user_id = data.get('user_id')

    # Check if the username is taken by other users (excluding the current user)
    user = users_instance.get_user_by_username(username_to_check)

    if user and user.user_id != current_user_id:
        return jsonify({'taken': True})
    else:
        return jsonify({'taken': False})

# API route to check if an email is taken
@app.route('/api/check-email', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def check_email_availability():
    data = request.json  # Get the JSON data from the request

    if 'email' not in data:
        return jsonify({'error': 'Email not provided'}), 400

    email_to_check = data['email']
    current_user_id = data.get('user_id')  # Get the current user's ID from the request data

    # Check if the email is taken by other users (excluding the current user)
    user = users_instance.find_user_by_email(email_to_check)
    
    if user and user.user_id != current_user_id:
        return jsonify({'taken': True})
    else:
        return jsonify({'taken': False})

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

# Studyspot aggregation API
@app.route('/api/studyspots/reviews', methods=['GET'])
def get_studyspot_with_reviews():
    try:
        data = None
        studyspot_name = request.args.get('name')
        if not studyspot_name:
            data = studyspots_instance.get_studyspots_with_reviews()
        else:
            data = studyspots_instance.get_studyspot_by_name_with_reviews(studyspot_name)
        print(data)
        return make_response(jsonify({
            'message': 'OK', 
            'data': data
        }), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({
            'message': 'FAILED', 
            'data': None
        }), 400)

# Studyspot search API
@app.route('/api/studyspots/serach', methods=['POST'])
def search_studyspot():
    pass


# Get a single studyspot by id
@app.route('/api/studyspots/<int:studyspot_id>', methods=['GET'])
def get_studyspot_by_id(studyspot_id):
    #studyspot = next((spot for spot in studyspots_instance if spot['id'] == studyspot_id), None)
    studyspot = None
    if studyspot is not None:
        return jsonify(studyspot)
    else:
        return jsonify({'message': 'Study spot not found'}), 404

'''
REVIEWS API 
'''

# Get review by id
@app.route('/review/<int:review_id>', methods=['GET'])
def get_review_id(review_id):
    review = reviews_instance.get_review_by_id(review_id)
    if review:
        serialized_review = review.serialize()
        return jsonify({"review": serialized_review}), 200
    else:
        return jsonify({'message': 'Review not found'}), 404

# Adding a new review 
@app.route('/review/add-user', methods=['POST'])
def add_new_user():
    review_id = request.json.get('review_id')
    user_id= request.json.get('user_id')
    studyspot_id = request.json.get('studyspot_id')
    review_comments = request.json.get('review_comments')
    review_indoor = request.json.get('review_indoor')
    review_wifi = request.json.get('review_wifi')
    review_temp = request.json.get('review_temp')
    review_rate = request.json.get('review_rate')
    review_ada = request.json.get('review_ada')
    review_power_outlets = request.json.get('review_poer_outlets')
    review_easy_to_find = request.json.get('review_easy_to_find')
    
    if reviews_instance.add_review(review_id):
        return make_response(jsonify({'message': 'Review already exists'})), 404
    else:
        new_review = {'review_id': review_id, 'user_id': user_id, 'studyspot_id': studyspot_id, 'review_comments': review_comments,
                      'review_indoor': review_indoor, 'review_wifi': review_wifi, 'review_temp': review_temp, 'review_rate': review_rate,
                      'review_ada': review_ada, 'review_power_outlets': review_power_outlets, 'review_easy_to_find': review_easy_to_find}
        reviews_instance.add_review(new_review)
    return make_response(jsonify({'message': 'Review created successfully'}), 201)

# Updating a review by id    
@app.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    try:
        # Parse the JSON data from the request
        data = request.get_json()

        # Extract the fields for the review update
        new_review_comments = data.get("review_comments")
        new_review_indoor = data.get("review_indoor")
        new_review_wifi = data.get("review_wifi")
        new_review_temp = data.get("review_temp")
        new_review_rate = data.get("review_rate")
        new_review_ada = data.get("review_ada")
        new_review_power_outlets = data.get("review_power_outlets")
        new_review_easy_to_find = data.get("review_easy_to_find")
        
        result = reviews_instance.update_review(
                review_id,
                new_review_comments,
                new_review_indoor,
                new_review_wifi,
                new_review_temp,
                new_review_rate,
                new_review_ada,
                new_review_power_outlets,
                new_review_easy_to_find
            )

        # Check if the result is a review object or a message
        if result:
            return jsonify({"message": result}), 404
        else:
            return jsonify({"message": "Review updated successfully.", "review": result.serialize()}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Deleting a review 
@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    try:
        # Call the delete_review method
        result = reviews_instance.delete_review(review_id)

        # Check if the result is a success message or an error message
        if result:
            return jsonify({"message": "Review deleted successfully."}), 200
        else:
            return jsonify({"message": "Review not found."}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
