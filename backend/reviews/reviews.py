
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Reviews
from db.db_connection_test import Studyspots
from sqlalchemy.sql import func
class Reviews_API():

    def __init__(self, db):
        self.db = db

    # Reference: https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.join
    def get_reviews_by_university(self):
        try:
            """
            Select * from (
                Select 
                    studyspot_name, 
                    round(avg(review_wifi)) as wifi,
                    avg(review_rate) as rating,
                    round(avg(review_temp)) as temperature
                from Reviews as r
                Group by r.studyspot_name
            ) as n
            INNER JOIN Studyspots as s ON s.studyspot_name = n.studyspot_name;
            """
            # Define the subquery to calculate the aggregates
            subquery = self.db.session.query(
                Reviews.studyspot_name,
                func.round(func.avg(Reviews.review_wifi)).label('wifi'),
                func.avg(Reviews.review_rate).label('rating'),
                func.round(func.avg(Reviews.review_temp)).label('temperature')
            ).group_by(Reviews.studyspot_name).subquery()

            # Join the subquery with the Studyspots table
            q = self.db.session.query(subquery, Studyspots).join(Studyspots, subquery.c.studyspot_name == Studyspots.studyspot_name)
            reviews = self.db.session.execute(q).all()
            
            # Construct python list & dict as a result and return it.
            results = []
            for review in reviews:
                data_dict = {
                    'studyspot': review.Studyspots.as_dict(),
                    'wifi': review.wifi,
                    'rating': review.rating,
                    'temperature': review.temperature
                }
                results.append(data_dict)
            return results
        except Exception as e:
            raise e

           


