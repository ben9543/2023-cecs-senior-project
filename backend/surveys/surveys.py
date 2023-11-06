
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Surveys
from sqlalchemy.exc import SQLAlchemyError

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

    def get_next_survey_id(self):
        try:
            last_survey = self.db.query(Surveys).order_by(Surveys.survey_id.desc()).first()
            next_survey_id = last_survey.survey_id + 1 if last_survey else 1
            return next_survey_id
        except SQLAlchemyError as e:
            print("Error getting the next survey_id:", e)
            return None
    
    def create_check_in(self, studyspot_name, user_id, crowdedness, noise_level, wifi):
        try:
            survey_id = self.get_next_survey_id()
            if survey_id is None:
                return False
            
            new_check_in = Surveys(
                survey_id=survey_id,
                studyspot_name=studyspot_name,
                user_id=user_id,
                survey_crowdednes_level=crowdedness,
                survey_noise_level=noise_level,
                survey_wifi=wifi,
            )

            self.db.add(new_check_in)
            self.db.commit()
            return True

        except SQLAlchemyError as e:
            print("Error creating a new check-in:", e)
            return False