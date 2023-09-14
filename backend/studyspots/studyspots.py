
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation
from db.db_connection_test import Studyspots
class StudySpots_API():

    def __init__(self, db):
        self.db = db

    def get_studyspots(self):
        results = []
        query = self.db.session.execute(self.db.select(Studyspots).order_by(Studyspots.studyspot_name)).scalars().all()
        for q in query:
            results.append(q.as_dict())
        return results

           


