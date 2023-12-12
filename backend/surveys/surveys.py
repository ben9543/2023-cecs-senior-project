
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Surveys
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, timedelta, timezone

class Surveys_API():

    def __init__(self, db):
        self.db = db
        
    def get_checked_in_studyspots(self, user_id):
        try:
            checked_in_spots = self.db.session.query(Surveys).filter_by(user_id = user_id).all()
            
            if checked_in_spots == None:
                return []
            
            checked_in_spots_list = []
            for spot in checked_in_spots:
                checked_in_spots_list.append({
                    'survey_id': spot.survey_id,
                    'studyspot_name': spot.studyspot_name,
                    'user_id': spot.user_id,
                    'survey_crowdednes_level': spot.survey_crowdednes_level,
                    'survey_noise_level' : spot.survey_noise_level,
                    'survey_wifi': spot.survey_wifi,
                    'survey_created_at': spot.survey_created_at,
                    'checked_out': spot.checked_out
                })

            return checked_in_spots_list

        except Exception as e:
            print("Error retrieving all surveys from the database:", e)
            return []

    def get_next_survey_id(self):
        try:
            survey_count = self.db.session.query(Surveys).count()
            return int(survey_count)

        except Exception as e:
            print("Error counting users in the database:", e)
            self.db.session.rollback()
            return 0
    
    def create_check_in(self, studyspot_name, user_id, crowdedness, noise_level, wifi):
        try:
            survey_id = self.get_next_survey_id()
            if survey_id == 0:
                survey_id = 1
            else:
                survey_id += 100
            
            created_at = datetime.now(timezone.utc)
            
            # Check if there's a study spot with created_at > current_time and checked_out is False
            # taken = self.db.session.query(Surveys).filter_by(studyspot_name = studyspot_name).filter_by(Surveys.survey_created_at > created_at).filter_by(Surveys.checked_out == False).first()
            taken = (self.db.session.query(Surveys).filter(Surveys.studyspot_name == studyspot_name).order_by(Surveys.survey_id.desc()).first())
            if taken:
                if taken.survey_created_at +  timedelta(hours=2) > created_at:
                    if not taken.checked_out:
                        return False

            new_check_in = Surveys(
                survey_id=survey_id,
                studyspot_name=studyspot_name,
                user_id=user_id,
                survey_crowdednes_level=crowdedness,
                survey_noise_level=noise_level,
                survey_wifi=wifi,
                survey_created_at=created_at,
                checked_out = False
            )

            self.db.session.add(new_check_in)
            self.db.session.commit()
            return True

        except SQLAlchemyError as e:
            print("Error creating a new check-in:", e)
            return False
    
    def checkout_from_studyspot(self, survey_id):
        survey = self.db.session.query(Surveys).filter_by(survey_id = survey_id).first()
        try:
            survey.checked_out = True
            self.db.session.commit()
            return True
        except SQLAlchemyError as e:
            print("Error creating a new check-in:", e)
            return False
        
    def get_checkedin_studyspots_names(self):
        names=[]
        studyspot_names = self.db.session.query(Surveys.studyspot_name).all()
        names = [name[0] for name in studyspot_names]
        return names

    def get_latest_survey_for_studyspot(self, studyspot_name):
        try:
            latest_survey = (self.db.session.query(Surveys).filter(Surveys.studyspot_name == studyspot_name).order_by(Surveys.survey_id.desc()).first())

            if latest_survey:
                return {
                    'survey_id': latest_survey.survey_id,
                    'studyspot_name': latest_survey.studyspot_name,
                    'user_id': latest_survey.user_id,
                    'survey_crowdedness_level': latest_survey.survey_crowdednes_level,
                    'survey_noise_level': latest_survey.survey_noise_level,
                    'survey_wifi': latest_survey.survey_wifi,
                    'survey_created_at': latest_survey.survey_created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    'checked_out': latest_survey.checked_out
                }
            else:
                return None

        except SQLAlchemyError as e:
            print("Error retrieving latest survey for studyspot:", e)
            return None