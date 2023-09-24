from db.db_connection_test import Universities
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation


# API for CRUD Operations
class Universities_API():
    def __init__(self, db):
        self.db = db

    def get_university_list(self):
        uni = self.db.session.execute(self.db.select(Universities).order_by(Universities.university_name)).scalars()
        return uni
    
    def get_university_by_name(self, name):
        uni =  self.db.session.query(Universities).filter(Universities.university_name == name).first()
        return uni

    def add_university(self,uni_data):
        try:
            uni = Universities(
                university_name = uni_data["name"],
                university_zip = uni_data["zip"],
                university_state = uni_data["state"]
            )
            self.db.session.add(uni)
            self.db.session.commit()
        except Exception as e:
            print("Ooops someting went wrong =[",e)

    def update_university(self, name, zip, state):
        uni = self.get_university_by_name(name)
        if uni:
            try:
                self.db.session.execute(update(Universities).where(Universities.university_name==name).value(
                    university_zip = zip,
                    university_state = state
                ))
                self.db.session.commit()
            except Exception as e:
                print("Ooops someting went wrong =[",e)
        else:
            print("University does not exist!")
            


