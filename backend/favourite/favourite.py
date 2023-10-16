from db.db_connection_test import Favorites
from sqlalchemy.exc import SQLAlchemyError

class Favourites_API:

    def __init__(self, db):
        self.db = db

    def like_studyspot(self, studyspot_name, user_id):
        try:
            like = Favorites(studyspot_name=studyspot_name, user_id=user_id)
            self.db.session.add(like)
            self.db.session.commit()
            print("Study spot liked.")
        except Exception as e:
            print("Unable to like the study spot:", e)

    def unlike_studyspot(self, studyspot_name, user_id):
        try:
            like = self.db.session.query(Favorites).filter(Favorites.studyspot_name == studyspot_name, Favorites.user_id == user_id).first()
            if like:
                self.db.session.delete(like)
                self.db.session.commit()
                print("Study spot unliked.")
            else:
                print("Study spot not liked by the user.")
        except SQLAlchemyError as e:
            self.db.session.rollback()
            raise e
    def get_liked_state(self, studyspot_name, user_id):
        like = self.db.session.query(Favorites).filter(Favorites.studyspot_name == studyspot_name, Favorites.user_id == user_id).first()
        return {"liked": like is not None}