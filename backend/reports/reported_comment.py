from db.db_connection_test import Reported_comments
# https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/quickstart/#installation


# API for CRUD Operations
class Reported_comments_API():
    def __init__(self, db):
        self.db = db

    def get_reported_list(self):
        reports = self.db.session.execute(self.db.select(Reported_comments).order_by(Reported_comments.report_id)).scalars().all()
        results = []
        for r in reports:
            dict_result = r.as_dict()
            results.append(dict_result)
        return results
    

    def add_report(self,report_id,user_id,review_id,report_comment):
        try:
            report = Reported_comments(
                report_id = report_id,
                user_id = user_id,
                review_id = review_id,
                report_comment = report_comment
            )
            self.db.session.add(report)
            self.db.session.commit()
        except Exception as e:
            print("Ooops someting went wrong =[",e)

    def check_duplicate(self,user_id,review_id):
        request = self.db.session.query(Reported_comments).filter_by(user_id=user_id,review_id=review_id).first()
        if request: 
            return True
        else:
            return False
            
    def count_report(self):
        try:
            report_count = self.db.session.query(Reported_comments).count()
            return int(report_count)
        except Exception as e:
            print("Ooops someting went wrong =[",e)


