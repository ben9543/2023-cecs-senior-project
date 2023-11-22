from db.db_connection_test import Rejection
import random
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation


# API for CRUD Operations
class Rejections_API():
    def __init__(self, db):
        self.db = db

    def add_rejection(self,data):
        try:
            rejection = Rejection(
                user_id= data["user_id"],
                studyspot_name= data["studyspot_name"],
                university_name = data["university_name"],
                request_is_indoor= data["is_indoor"],
                request_ada= data["ada"],
                request_power_outlets= data["power_outlets"],
                request_easy_to_find= data["easy_to_find"],
                request_image_url= data["image_url"],
                request_location= data["location"],
                request_noise_level= data["noise_level"],
                request_crowdedness_level= data["crowdedness_level"],
                request_strong_wifi= data["strong_wifi"],
                request_reason = data["reason"]
            )
            self.db.session.add(rejection)
            self.db.session.commit()
        except Exception as e:
            print("Ooops someting went wrong =[\n",e)

    def create_rejection_from_request(self, request, rejection_reason = ""):
        new_rejection = Rejection(
            studyspot_name= request["studyspot_name"],
            university_name = request["university_name"],
            rejection_is_indoor= request["request_is_indoor"],
            rejection_ada= request["request_ada"],
            rejection_power_outlets= request["request_power_outlets"],
            rejection_easy_to_find= request["request_easy_to_find"],
            rejection_image_url= request["request_image_url"],
            rejection_location= request["request_location"],
            rejection_noise_level= request["request_noise_level"],
            rejection_crowdedness_level= request["request_crowdedness_level"],
            rejection_strong_wifi= request["request_strong_wifi"],
            rejection_reason = rejection_reason
        )
        self.db.session.add(new_rejection)
        self.db.session.commit()
        return new_rejection.as_dict()
            


