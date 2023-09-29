
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Reviews
from db.db_connection_test import Studyspots
from sqlalchemy.sql import func
class Reviews_API():

    def __init__(self, db):
        self.db = db
