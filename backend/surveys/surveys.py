
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Surveys

class Surveys_API():

    def __init__(self, db):
        self.db = db
        
    def get_checked_in_studyspots(self, user_id):
        try:
            checked_in_spots = (
                self.db.query(Surveys).filter(Surveys.user_id == user_id).all()
            )

            checked_in_spots_list = []
            for spot in checked_in_spots:
                checked_in_spots_list.append({
                    'survey_id': spot.survey_id,
                    'studyspot_name': spot.studyspot_name,
                    'user_id': spot.user_id,
                    'survey_crowdednes_level': spot.survey_crowdednes_level,
                    'survey_noise_level' : spot.survey_noise_level,
                    'survey_wifi': spot.survey_wifi,
                })

            return checked_in_spots_list

        except Exception as e:
            print("Error retrieving all surveys from the database:", e)
            return []