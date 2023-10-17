from db.db_connection_test import Favorites, Studyspots, Reviews
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import func

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
    
    def get_favorites_by_user(self, user_id):
        """
            SQL for getting studyspot reviews from favorites.user_id

            Without images
            Select f.studyspot_name, rating from (
                Select 
                    studyspot_name, 
                    avg(review_rate) as rating
                from Reviews as r
                Group by r.studyspot_name
            ) as n
            INNER JOIN Favorites as f ON f.studyspot_name = n.studyspot_name 
            where f.user_id = 1

            With images
            Select f.studyspot_name, rating, s.studyspot_image_url from (
                Select 
                    studyspot_name, 
                    avg(review_rate) as rating
                from Reviews as r
                Group by r.studyspot_name
            ) as n
            INNER JOIN Favorites as f ON f.studyspot_name = n.studyspot_name 
            INNER JOIN Studyspots as s ON s.studyspot_name = n.studyspot_name
            where f.user_id = 1
        """
        subquery = self.db.session.query(
            Reviews.studyspot_name,
            func.avg(Reviews.review_rate).label('rating')
        ).group_by(Reviews.studyspot_name).subquery()

        # Join the subquery with Favorites and Studyspots
        query = self.db.session.query(
            Favorites.studyspot_name,
            subquery.c.rating,
            Studyspots.studyspot_image_url
        ).join(subquery, Favorites.studyspot_name == subquery.c.studyspot_name)\
        .join(Studyspots, Favorites.studyspot_name == Studyspots.studyspot_name)\
        .filter(Favorites.user_id == user_id).all()   

        if query:
            results = []
            for x in query:
                studyspot = {"name":x.studyspot_name,"rating":x.rating}
                # studyspot["image"] = x.studyspot_image_url # Not needed for now
                results.append(studyspot) 
            return results
        else:
            return None



