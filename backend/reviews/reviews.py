
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Reviews
from db.db_connection_test import Studyspots
from sqlalchemy.sql import func
class Reviews_API():

    def __init__(self, db):
        self.db = db


    """
    SELECT * FROM Reviews WHERE user_id = 123;
    """
    def get_review(self, id):
        pass

    """
    UPDATE Reviews
    SET review_comments = 'Updated review!', review_wifi = 4, review_temp = 3, review_rate = 5.0, review_ada = FALSE, review_power_outlets = TRUE, review_easy_to_find = TRUE
    WHERE review_id = 1;
    """
    def update_review(self, id):
        pass

    """
    DELETE FROM Reviews WHERE review_id = 1;
    """
    def delete_review(self, id):
        pass