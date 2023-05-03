from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

# Dummy user database
users = {
    'user1': 'password1',
    'user2': 'password2'
}

# Authentication function
def auth(username, password):
    if username in users and password == users[username]:
        return True
    else:
        return False

# Protected route
@app.route('/protected')
def protected():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return make_response(jsonify({'error': 'Authorization header missing'}), 401)
    token = auth_header.split(' ')[1]
    try:
        username, password = token.split(':')
    except:
        return make_response(jsonify({'error': 'Invalid token'}), 401)
    if auth(username, password):
        return jsonify({'message': 'Protected content!'})
    else:
        return make_response(jsonify({'error': 'Authentication failed'}), 401)

# Login route
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if auth(username, password):
        return jsonify({'token': f'{username}:{password}'})
    else:
        return make_response(jsonify({'error': 'Authentication failed'}), 401)

if __name__ == '__main__':
    app.run(debug=True)
