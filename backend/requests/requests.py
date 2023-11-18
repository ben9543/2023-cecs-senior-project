from db.db_connection_test import Requests
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation


# API for CRUD Operations
class Requests_API():
    def __init__(self, db):
        self.db = db

    def add_requests(self,data):
        try:
            request = Requests(
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
            self.db.session.add(request)
            self.db.session.commit()
        except Exception as e:
            print("Ooops someting went wrong =[\n",e)

    def check_duplicate(self,user_id,studyspot_name):
        request = self.db.session.query(Requests).filter_by(user_id=user_id,studyspot_name=studyspot_name).first()
        if request: 
            return True
        else:
            return False
    
    def get_requested_studyspots(self):
        results = []
        query = self.db.session.execute(self.db.select(Requests)).scalars().all()
        for q in query:
            dict_result = q.as_dict()
            results.append(dict_result)
        return results

    def get_studyspot_by_name(self, name):
        studyspot = self.db.session.query(Requests).filter(Requests.studyspot_name == name).first()
        if studyspot:
            return studyspot.as_dict()
        else:
            return None
            


