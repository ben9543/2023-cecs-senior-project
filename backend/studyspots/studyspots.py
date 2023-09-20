
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

    def get_studyspot_by_id(self, id):
        studyspot = self.db.session.query(Studyspots).filter(Studyspots.id == id).first()
        if studyspot:
            return studyspot.as_dict()
        else:
            return None

    def update_studyspot_by_id(self, id, params):
        studyspot = self.db.session.query(Studyspots).filter(Studyspots.id == id).first()
        if studyspot:
            for key, value in params.items():
                setattr(studyspot, key, value)
            self.db.session.commit()
            return studyspot.as_dict()
        else:
            return None

    def delete_studyspot_by_id(self, id):
        studyspot = self.db.session.query(Studyspots).filter(Studyspots.id == id).first()
        if studyspot:
            self.db.session.delete(studyspot)
            self.db.session.commit()
            return {"message": "Studyspot deleted successfully"}
        else:
            return None

    def create_studyspot(self, params):
        new_studyspot = Studyspots(**params)
        self.db.session.add(new_studyspot)
        self.db.session.commit()
        return new_studyspot.as_dict()
