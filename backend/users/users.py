# class Users:
#         def __init__(self, db_instance):
#                 self.db_instance = db_instance

#         def get_user(self, user_id):
#                 # retrieve a user from database using the user_id
#                 pass
        
#         def add_user(self, username, password):
#                 # creates a new user
#                 success = db_instance.createUser()
#                 if success:
#                         return {"user":username, "success":True, "message": "Successfully Created"}
#                 else:
#                         return {"success":False, message: "Failed to create"}
        
#         def update_user(self, user_id, body):
#                 # update the user in database
#                 name = body['name']
#                 password = body['password']
#                 # add code to update user in database
#                 pass
        
#         def delete_user(self, user_id):
#                 # delete the user from the user database
#                 pass

from flask import Flask, request

app = Flask(__name__)

# Create a list of users for demonstration purposes
users = [
    {'id': 1, 'email': 'a@gmail.com', 'password': 'password1'},
    {'id': 2, 'email': 'b@gmail.com', 'password': 'password2'},
    {'id': 3, 'email': 'c@gmail.com', 'password': 'password3'}
]

# GET user by ID
@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((user for user in users if user['id'] == user_id), None)
    if user:
        return (f"{user} had been created successfully")
    else:
        return "User not Found"

# CREATE a user
@app.route('/api/users', methods=['POST'])
def create_user():
    email = request.json.get('email')
    password = request.json.get('password')
    if email and password:
        new_user = {'id': len(users) + 1, 'email': email, 'password': password}
        users.append(new_user)
        return (f"{new_user} had been created successfully")
    else:
        return "User not Found"

# EDIT user profile by ID
@app.route('/api/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user = next((user for user in users if user['id'] == user_id), None)
    if user:
        for key, value in request.json.items():
            if key != 'email':
                user[key] = value
        return (f"{user} had been created successfully")
    else:
       return "User not Found"

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = next((user for user in users if user['id'] == user_id), None)
    if user:
        users.remove(user)
        (f"User had been deleted successfully")
    else:
        return "User not Found"


if __name__ == '__main__':
    app.run(debug=True)

        