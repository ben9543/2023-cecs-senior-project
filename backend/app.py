from flask import Flask, request, jsonify, make_response
from auth.auth import Auth
app = Flask(__name__)
auth_instance = Auth({})

# Users Routes

# GET user by ID
@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    pass

# CREATE a user
@app.route('/api/users', methods=['POST'])
def create_user():
    pass

# EDIT user profile by ID
@app.route('/api/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    pass

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    pass


# Protected route
@app.route('/protected')
def protected():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return make_response(jsonify({'error': 'Authorization header missing'}), 401)
    token = auth_header.split(' ')[1]

    if auth_instance.verify_token(token):
        return make_response(jsonify({'message': 'Protected content!'}), 200)
    else:
        return make_response(jsonify({'error': 'Authentication failed'}), 401)

# Login route
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    token = auth_instance.generate_jwt(email, password)
    if token:
        return make_response(jsonify({'message': 'Token generated', 'token':token}), 401)
    else:
        return make_response(jsonify({'error': 'Authentication failed'}), 401)

if __name__ == '__main__':
    app.run(debug=True)
