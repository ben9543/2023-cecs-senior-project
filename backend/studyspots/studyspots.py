
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Studyspots
from db.db_connection_test import Reviews
from sqlalchemy.sql import func
import random

def create_studyspot_and_review_object(data):
    return {
        'studyspot_name': data.Studyspots.as_dict()['studyspot_name'],
        'studyspot_image_url': data.Studyspots.as_dict()['studyspot_image_url'],
        'studyspot_rating': data.rating,
    }

bucket_name = "studyspot-123"
region = "us-west-1"

def generate_object_url_from_key(key):
    return f"https://{bucket_name}.s3.{region}.amazonaws.com/{key}"

class StudySpots_API():

    def __init__(self, db):
        self.db = db

    def get_studyspots(self):
        results = []
        query = self.db.session.execute(self.db.select(Studyspots).order_by(Studyspots.studyspot_name)).scalars().all()
        for q in query:
            dict_result = q.as_dict()
            dict_result['studyspot_image_url'] = generate_object_url_from_key(dict_result['studyspot_name'])
            results.append(dict_result)
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
                func.avg(Reviews.review_rate).label('rating'),
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
        
    def get_all_studyspot_name(self):
        names = []
        studyspot_names = self.db.session.query(Studyspots.studyspot_name).all()
        names = [name[0] for name in studyspot_names]
        return names
    
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
            # Group reviews by studyspot nmame
            query = self.db.session.query(
                Studyspots.studyspot_location,
                Studyspots.studyspot_is_indoor,
                Studyspots.studyspot_ada,
                Studyspots.studyspot_power_outlets,
                Studyspots.studyspot_easy_to_find,
                Studyspots.studyspot_noise_level,
                Studyspots.studspot_crowdedness_level,
                Studyspots.studyspot_strong_wifi,
                Studyspots.studyspot_image_url,
                Reviews.studyspot_name,
                func.avg(Reviews.review_rate).label('rating'),
            ).group_by(Reviews.studyspot_name,Studyspots.studyspot_location,
                Studyspots.studyspot_is_indoor,
                Studyspots.studyspot_ada,
                Studyspots.studyspot_power_outlets,
                Studyspots.studyspot_easy_to_find,
                Studyspots.studyspot_noise_level,
                Studyspots.studspot_crowdedness_level,
                Studyspots.studyspot_image_url,
                Studyspots.studyspot_strong_wifi).having(Reviews.studyspot_name==name)

            # Get list of reivews that has the studyspot name
            studyspot_result = query.first()
            query = self.db.session.query(
                Reviews.studyspot_name,
                func.avg(Reviews.review_rate).label('rating'),
            ).group_by(Reviews.studyspot_name).having(Reviews.studyspot_name==name)
            review_results = self.db.session.query(Reviews).filter(Reviews.studyspot_name == studyspot_result.studyspot_name).all()
            
            # Construct data
            results = {
                "studyspot_location":studyspot_result.studyspot_location,
                "studyspot_is_indoor":studyspot_result.studyspot_is_indoor,
                "studyspot_ada":studyspot_result.studyspot_ada,
                "studyspot_power_outlets":studyspot_result.studyspot_power_outlets,
                "studyspot_easy_to_find":studyspot_result.studyspot_easy_to_find,
                "studyspot_noise_level":studyspot_result.studyspot_noise_level,
                "studspot_crowdedness_level":studyspot_result.studspot_crowdedness_level,
                "studyspot_strong_wifi":studyspot_result.studyspot_strong_wifi,
                "studyspot_name":studyspot_result.studyspot_name,
                "studyspot_rating":studyspot_result.rating,
                "studyspot_image_url": studyspot_result.studyspot_image_url,
                "reviews":[]
            }
            for review in review_results:
                results["reviews"].append(review.as_dict())
            
            return results
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
    
    def create_studyspot_from_request(self, request):
        new_studyspot = Studyspots(
            studyspot_id = request["user_id"] + random.randint(1,100000000),
            studyspot_name= request["studyspot_name"],
            university_name = request["university_name"],
            studyspot_is_indoor= request["request_is_indoor"],
            studyspot_ada= request["request_ada"],
            studyspot_power_outlets= request["request_power_outlets"],
            studyspot_easy_to_find= request["request_easy_to_find"],
            studyspot_image_url= request["request_image_url"],
            studyspot_location= request["request_location"],
            studyspot_noise_level= request["request_noise_level"],
            studspot_crowdedness_level= request["request_crowdedness_level"],# Typo
            studyspot_strong_wifi= request["request_strong_wifi"]
        )
        self.db.session.add(new_studyspot)
        self.db.session.commit()
        return new_studyspot.as_dict()
    
    def search_studyspot(self, args):

        # is_indoor
        # noise_level
        # crowdness_level
        # is_outlet
        # wifi
        # ADA
        # easy_to_find
        pass
