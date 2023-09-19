from db.db_connection_test import Users
#https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from sqlalchemy.exc import SQLAlchemyError 

# API for CRUD Operations
class User_API():
    def __init__(self, db):
        self.db = db
    
    def add_user(self, user_data):
        try:
            # Create a new User instance and add it to the database
            new_user = Users(
                user_id=user_data['id'],
                user_email=user_data['email'],
                user_name=user_data['username'],
                university_name=user_data['college'],
                password=user_data['password'],
                user_photo=user_data.get('user_photo', '')  # You can add user_photo if available
            )
            self.db.session.add(new_user)
            self.db.session.commit()
            print("User added successfully.")

        except Exception as e:
            print("Error adding user to the database:", e)

    def get_user_by_id(self, user_id):
        user = self.db.session.query(Users).filter_by(user_id=user_id).first()
        if user:
            return user
        else:
            return None
        
    def get_user_by_username(self, username):
        return self.db.session.query(Users).filter_by(user_name=username).first()

    def get_users(self):
        try:
            # Use SQLAlchemy to retrieve all users from the Users table
            all_users = self.db.session.query(Users).all()
            return all_users

        except Exception as e:
            print("Error retrieving all users from the database:", e)
            return []
    
    def find_user_by_email(self, email):
        # Check which user has the specific email
        user_with_target_email = [user for user in self.get_users() if user.user_email == email]
                
        if user_with_target_email:
            return user_with_target_email[0]
        else:
            return None
    
    def count_users(self):
        try:
            # Use SQLAlchemy to count the number of users in the Users table
            user_count = self.db.session.query(Users).count()
            print("Number of users:------>>>>>>>>>>>", user_count)
            return int(user_count)

        except Exception as e:
            print("Error counting users in the database:", e)
            self.db.session.rollback()
            return 0

    def delete_user(self, user_id):
        user = Users.query.get(user_id)
        if user:
            self.db.session.delete(user)
            self.db.session.commit()
            return True
        return False

    def create_user(self, user_data):
        new_user = Users(**user_data)
        self.db.session.add(new_user)
        self.db.session.commit()
        return new_user.as_dict()

    # Function to update user data by user_id
    def update_user(self,user_id, new_username, new_email, new_college):
        try:
            # Query the database to find the user by user_id
            user =self.get_user_by_id(user_id)
            print("User from U------->>>>>>>>>>>>>>", user)
            if user:
                # Update the user data with the new values
                user.user_name = new_username
                user.user_email = new_email
                user.university_id = new_college

                # Commit the changes to the database
                self.db.session.commit()

                return user  # Return the updated user object

            return None  # User not found

        except SQLAlchemyError as e:
            # Handle any database-related errors here
            self.db.session.rollback()  # Rollback changes in case of an error
            raise e  # Raise the error for further handling

        finally:
            self.db.session.close()  # Close the database session