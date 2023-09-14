from db.db_connection_test import Users


# API for CRUD Operations
class User_API():
    def __init__(self, db):
        self.db = db

    def get_user(self, id):
        # https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
        # self.db.session
        pass