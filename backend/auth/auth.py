from flask import Flask, request, jsonify, make_response
import jwt

SECRET = "secret"

class Auth:
    def __init__(self, db, users, admins):
        self.db = db
        self.users = users
        self.admins = admins

    def generate_jwt(self, email):
        user = self.users.find_user_by_email(email)
        if user:
            # generate a JWT token
            payload = {"id":int(user.user_id)}
            # Will include user id into the jwt payload
            return jwt.encode(payload, SECRET)
        
        return None
    
    def generate_jwt_admin(self, email):
        admin = self.admins.find_user_by_email(email)
        if admin:
            # generate a JWT token
            payload = {"id":int(admin.admin_id)}
            # Will include user id into the jwt payload
            return jwt.encode(payload, SECRET)
        
        return None
    
    def verify_token(self, token):
        try:        
            payload = jwt.decode(token, SECRET, algorithms=["HS256",])
            user_id = int(payload["id"])
            user = self.users.get_user_by_id(user_id)
            # If the payload exists, and user_id exists and user with the user_id exists in the DB, we return the token
            if(payload and user_id and user):
                return user.as_dict()
            else:
                return None
        except:

            # Will include error message here later
            return None
    
    def verify_admin_token(self, token):
        try:        
            payload = jwt.decode(token, SECRET, algorithms=["HS256",])
            admin_id = int(payload["id"])
            admin = self.admins.get_admin_by_id(admin_id)
            # print(admin)
            # If the payload exists, and user_id exists and user with the user_id exists in the DB, we return the token
            if(payload and admin_id and admin):
                return admin.as_dict()
            else:
                return None
        except:

            # Will include error message here later
            return None
