from flask import Flask, request, jsonify, make_response
import jwt

SECRET = "secret"

class Auth:
    def __init__(self, db, users):
        self.db = db
        self.users = users

    def generate_jwt(self, email, password):
        user = self.users.find_user_by_email(email)
        if(user and user['password'] == password):

            # Will include user id into the jwt payload
            return jwt.encode({"id":int(user["id"])}, SECRET, algorithms="HS256")
        
        return None
    
    def verify_token(self, token):
        try:        
            payload = jwt.decode(token, SECRET, algorithms="HS256")
            user_id = int(payload["id"])
            user = self.users.get_user(user_id)
            
            # If the payload exists, and user_id exists and user with the user_id exists in the DB, we return the token
            if(payload and user_id and user):
                return user
            else:
                return None
        except:

            # Will include error message here later
            return None