from db.db_connection_test import Users
#https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation

# API for CRUD Operations
class User_API():
    def __init__(self, db):
        self.db = db
    
    def get_user_by_id(self, user_id):
        user = Users.query.get(user_id)
        if user:
            return user.as_dict()
        else:
            return None

    def get_users(self):
        users = Users.query.all()
        return [user.as_dict() for user in users]
    
    def delete_user(self, user_id):
        user = Users.query.get(user_id)
        if user:
            self.db.session.delete(user)
            self.db.session.commit()
            return True
        return False

    def create_user(self, user_data):
        new_user = Users(**user_data)
        self.db.session.add(new_user)
        self.db.session.commit()
        return new_user.as_dict()

    def update_user(self, user_id, updated_data):
        user = Users.query.get(user_id)
        if user:
            for key, value in updated_data.items():
                setattr(user, key, value)
            self.db.session.commit()
            return user.as_dict()
        return None