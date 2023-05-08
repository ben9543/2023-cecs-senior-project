# Create a list of users for demonstration purposes
users = [
    {'id': 1, 'email': 'a@gmail.com', 'password': 'password1'},
    {'id': 2, 'email': 'b@gmail.com', 'password': 'password2'},
    {'id': 3, 'email': 'c@gmail.com', 'password': 'password3'}
]

class Users:
    def __init__(self, db):
        self.db = db

    def get_users(self):
        return users

    # GET user by ID
    def get_user(self, user_id):
        user = next((user for user in users if user['id'] == user_id), None)
        if user:
            return user
        else:
            return None

    def find_user_by_email(self, email):
        user = next((user for user in users if user['email'] == email), None)
        if user: 
            return user
        else: 
            return None

    # CREATE a user
    def add_user(self, user):
        users.append(user)

    # # EDIT user profile by ID
    # def edit_user(user_id):
    #     user = next((user for user in users if user['id'] == user_id), None)
    #     if user:
    #         for key, value in request.json.items():
    #             if key != 'email':
    #                 user[key] = value
    #         return (f"{user} had been created successfully")
    #     else:
    #         return "User not Found"

    # def delete_user(user_id):
    #     user = next((user for user in users if user['id'] == user_id), None)
    #     if user:
    #         users.remove(user)
    #         (f"User had been deleted successfully")
    #     else:
    #         return "User not Found"

        