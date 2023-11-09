from db.db_connection_test import Admins
from db.db_connection_test import Studyspots, Requests

REQUEST_STATUS = ['in_progress', 'rejected', 'approved']

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
    
    def approve_request(self, studyspot_name):
        """
        UPDATE studyspots
        SET column1 = true
        WHERE studyspots.studyspot_name = f"{studyspot_name}"
        """
        request = Requests.query.filter_by(studyspot_name=studyspot_name).first()
        if request:
            
            # 1. Update the request status as approved
            request = self.db.session.query(Requests).filter_by(studyspot_name=studyspot_name).first()
            setattr(request, "request_status", "approved")
            
            # 2. Create a new studyspot using request
            new_studyspot = Studyspots(
                studyspot_name = request.studyspot_name,
                university_name = request.university_name,
                request_is_indoor = request.request_is_indoor,
                request_ada = request.request_ada,
                request_power_outlets = request.request_power_outlets,
                studyspot_easy_to_find = request.request_easy_to_find,
                studyspot_image_url = request.request_image_url,
                studyspot_location = request.request_location,
                studyspot_noise_level = request.request_noise_level,
                studspot_crowdedness_level = request.request_crowdedness_level,
                studyspot_strong_wifi = request.request_strong_wifi,
                studyspot_is_approved = True,
                request_status = REQUEST_STATUS[-1]
            )

            self.db.session.add(new_studyspot)
            self.db.session.commit()
            return True
        else:
            return False
        
    def reject_request(self, studyspot_name):
        """
        UPDATE studyspots
        SET column1 = true
        WHERE studyspots.studyspot_name = f"{studyspot_name}"
        """
        request = Requests.query.filter_by(studyspot_name=studyspot_name).first()
        if request:
            # 1. Update the request status as rejected
            request = self.db.session.query(Requests).filter_by(studyspot_name=studyspot_name).first()
            setattr(request, "request_status", "rejected")
            self.db.session.commit()
            return True
        else:
            return False