
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Studyspots
from db.db_connection_test import Reviews
from sqlalchemy.sql import func

def create_studyspot_and_review_object(data):
    return {
        'studyspot': data.Studyspots.as_dict(),
        'wifi': data.wifi,
        'rating': data.rating,
        'temperature': data.temperature
    }

class StudySpots_API():

    def __init__(self, db):
        self.db = db

    def get_studyspots(self):
        results = []
        query = self.db.session.execute(self.db.select(Studyspots).order_by(Studyspots.studyspot_name)).scalars().all()
        for q in query:
            results.append(q.as_dict())
        return results
    
        # Reference: https://docs.sqlalchemy.org/en/20/orm/queryguide/query.html#sqlalchemy.orm.Query.join
    def get_studyspots_with_reviews(self):
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
                data_dict = create_studyspot_and_review_object(review)
                results.append(data_dict)
            return results
        except Exception as e:
            raise e

    def get_studyspot_by_id(self, id):
        
        studyspot = self.db.session.query(Studyspots).filter(Studyspots.id == id).first()
        if studyspot:
            return studyspot.as_dict()
        else:
            return None
        
    def get_studyspot_by_name(self, name):
        studyspot = self.db.session.query(Studyspots).filter(Studyspots.studyspot_name == name).first()
        if studyspot:
            return studyspot.as_dict()
        else:
            return None
    
    def get_studyspot_by_name_with_reviews(self, name):
        """
        Select * from (
            Select 
                studyspot_name, 
                round(avg(review_wifi)) as wifi,
                avg(review_rate) as rating,
                round(avg(review_temp)) as temperature
            from Reviews as r
            Group by r.studyspot_name
            having r.studyspot_name = 'Library'
        ) as n
        INNER JOIN Studyspots as s ON s.studyspot_name = n.studyspot_name;
        """
        try:
            # Define the subquery to calculate the aggregates
            subquery = self.db.session.query(
                Reviews.studyspot_name,
                func.round(func.avg(Reviews.review_wifi)).label('wifi'),
                func.avg(Reviews.review_rate).label('rating'),
                func.round(func.avg(Reviews.review_temp)).label('temperature')
            ).group_by(Reviews.studyspot_name).having(Reviews.studyspot_name==name).subquery()

            # Construct python list & dict as a result and return it.
            # Perform the main query with a join
            query = self.db.session.query(
                subquery.c.studyspot_name,
                subquery.c.wifi,
                subquery.c.rating,
                subquery.c.temperature,
                Studyspots  # Include the Studyspots table in the query
            ).join(Studyspots, subquery.c.studyspot_name == Studyspots.studyspot_name)

            # Execute the query and retrieve the results
            result = query.first()
            data_dict = create_studyspot_and_review_object(result)
            return data_dict
            # Print the results
        except Exception as e:
            raise e

    def update_studyspot_by_id(self, id, params):
        studyspot = self.db.session.query(Studyspots).filter(Studyspots.id == id).first()
        if studyspot:
            for key, value in params.items():
                setattr(studyspot, key, value)
            self.db.session.commit()
            return studyspot.as_dict()
        else:
            return None

    def delete_studyspot_by_id(self, id):
        studyspot = self.db.session.query(Studyspots).filter(Studyspots.id == id).first()
        if studyspot:
            self.db.session.delete(studyspot)
            self.db.session.commit()
            return {"message": "Studyspot deleted successfully"}
        else:
            return None

    def create_studyspot(self, params):
        new_studyspot = Studyspots(**params)
        self.db.session.add(new_studyspot)
        self.db.session.commit()
        return new_studyspot.as_dict()
