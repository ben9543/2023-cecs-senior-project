
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Reviews
from db.db_connection_test import Studyspots
from sqlalchemy.sql import func
from sqlalchemy.exc import SQLAlchemyError
class Reviews_API():

    def __init__(self, db):
        self.db = db


    """
    SELECT * FROM Reviews WHERE user_id = 123;
    """
    def get_review_by_id(self, id):
        review = self.db.session.query(Reviews).filter(Reviews.review_id == id).first()
        if review:
            return review
        else:
            return None

    """
    UPDATE Reviews
    SET review_comments = 'Updated review!', review_wifi = 4, review_temp = 3, review_rate = 5.0, review_ada = FALSE, review_power_outlets = TRUE, review_easy_to_find = TRUE
    WHERE review_id = 1;
    """
    def update_review(self, review_id, new_review_comments, new_review_indoor, new_review_wifi, new_review_temp, new_review_rate,
                      new_review_ada, new_review_power_outlets, new_review_easy_to_find):
        review = self.get_review_by_id(review_id)
        try:
            if review:
                review.review_comments = new_review_comments,
                review.review_indoor = new_review_indoor,
                review.review_wifi = new_review_wifi,
                review.review_temp = new_review_temp,
                review.review_rate = new_review_rate,
                review.review_ada = new_review_ada,
                review.review_power_outlets = new_review_power_outlets,
                review.review_easy_to_find = new_review_easy_to_find
                
                self.db.session.commit()
                print("Your review has been updated successfully.")
                return review
            else:
                return ("Review does not exist!")
        except SQLAlchemyError as e:
            self.db.session.rollback()
            raise e

    """
    DELETE FROM Reviews WHERE review_id = 1;
    """
    def delete_review(self, id):
        review = self.get_review_by_id(id)
        try:
            if review:
                self.db.session.delete(review)
                self.db.session.commit()
                print("Your review had been deleted.")
        except SQLAlchemyError as e:
            self.db.session.rollback()
            raise e
        
    # Add a new review
    def add_review(self, review_data):
        try:
            review = Reviews(
                review_id = review_data["review_id"],
                user_id=review_data["user_id"],
                studyspot_id = review_data["studyspot_id"],
                review_comments = review_data["review_comments"],
                review_indoor = review_data["review_indoor"],
                review_wifi = review_data["review_wifi"],
                review_temp = review_data["review_temp"],
                review_rate = review_data["review_rate"],
                review_ada = review_data["review_ada"],
                review_power_outlets = review_data["review_poer_outlets"],
                review_easy_to_find = review_data["review_easy_to_find"]
                
            )
            self.db.session.add(review)
            self.db.session.commit()
            print("Your review has been added")
        except Exception as e:
            print("Unable to add your review", e)