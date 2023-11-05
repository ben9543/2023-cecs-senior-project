from db.db_connection_test import Admins
from db.db_connection_test import Studyspots

# API for CRUD Operations
class Admin_API():
    def __init__(self, db):
        self.db = db
    
    def get_admin_users(self):
        try:
            # Use SQLAlchemy to retrieve all users from the Users table
            all_admin_users = self.db.session.query(Admins).all()
            return all_admin_users

        except Exception as e:
            print("Error retrieving all users from the database:", e)
            return []
    
    def find_user_by_email(self, email):
        # Check which user has the specific email
        admin_user_with_target_email = [admin_user for admin_user in self.get_admin_users() if admin_user.admin_user_email == email]
                
        if admin_user_with_target_email:
            return admin_user_with_target_email[0]
        else:
            return None
    
    def approve_studyspot(self, studyspot_name):
        """
        UPDATE studyspots
        SET column1 = true
        WHERE studyspots.studyspot_name = f"{studyspot_name}"
        """
        study_spot = Studyspots.query.filter_by(studyspot_name=studyspot_name).first()
        if study_spot:
            study_spot.studyspot_is_approved = True
            self.db.session.commit()
            return True
        else:
            return None