from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'DATABASE_URI'
db = SQLAlchemy(app)

# Definfing a SQLAlcehmy model for the User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    name = db.Column(db.String(255))
    password = db.Column(db.String(255))
    university_id = db.Column(db.Integer)

# API for CRUD Operations

# Get all users
@app.route('/api/users', methods=['GET'])
def get_users():
    users= User.query.all()
    users_data = [{'id':user.id, 'email': user.email, 'name': user.name, 'university_id': user.univerity_id} for user in users]
    return jsonify(users_data)

# Get user by id
@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user:
        return jsonify({'id':user.id, 'email': user.email, 'name': user.name, 'university_id': user.univerity_id})
    else:
        return jsonify({'message': 'User not found'}), 404

# Create a new user
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    user = User(email=data['email'], name=data['name'], password=data['password'], univerity_id=data['university_id'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# Update user information
@app.route('/api/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    if user:
        data = request.json
        user.name = data['name']
        user.emial = data['email']
        user.password = data['password']
        user.university_id = data['university_id']
        db.session.commit()
        return jsonify({'message': 'User updated successfully'})
    else:
        return jsonify({'message': 'User not found'}), 404

# Delete user from database
@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'message': 'User not found'}), 404

if __name__ == '__main__':
    app.run()