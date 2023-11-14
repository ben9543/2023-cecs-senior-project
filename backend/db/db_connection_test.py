from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.orm import DeclarativeBase


# Adding dictionary parsing feature
class Base(DeclarativeBase):
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Universities(Base):
    __tablename__ = 'universities'

    university_name = Column(String(200), primary_key=True)
    university_state = Column(String(2))
    university_zip = Column(Integer, nullable=False, unique=True)

class Studyspots(Base):
    __tablename__ = 'studyspots'

    studyspot_id = Column(Integer, primary_key=True)
    studyspot_name = Column(String(254), unique=True)
    university_name = Column(String(200), ForeignKey('universities.university_name'))
    studyspot_is_indoor = Column(Boolean)
    studyspot_ada = Column(Boolean)
    studyspot_power_outlets = Column(Boolean)
    studyspot_easy_to_find = Column(Boolean)
    studyspot_image_url = Column(String(3000))
    studyspot_location = Column(String(3000))
    studyspot_noise_level = Column(Integer)
    studspot_crowdedness_level = Column(Integer)
    studyspot_strong_wifi = Column(Boolean)

    university = relationship("Universities")

class Users(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    user_email = Column(String(254))
    user_name = Column(String(200))
    password = Column(String(512))
    university_name = Column(String(200), ForeignKey('universities.university_name'), nullable=False)
    user_photo = Column(String(250))

    university = relationship("Universities")

class Admins(Base):
    __tablename__ = 'admins'

    admin_id = Column(Integer, primary_key=True)
    admin_email = Column(String(254))
    password = Column(String(512))

class Surveys(Base):
    __tablename__ = 'surveys'

    survey_id = Column(Integer, primary_key=True)
    studyspot_name = Column(String(254), ForeignKey('studyspots.studyspot_name'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    survey_crowdednes_level = Column(Integer, nullable=False)
    survey_noise_level = Column(Integer, nullable=False)
    survey_wifi = Column(Integer, nullable=False)

    studyspot = relationship("Studyspots")
    user = relationship("Users")

class Reviews(Base):
    __tablename__ = 'reviews'

    review_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    studyspot_name = Column(String(254), ForeignKey('studyspots.studyspot_name'), nullable=False)
    review_comments = Column(String(500))
    review_rate = Column(Float, nullable=False)

    studyspot = relationship("Studyspots")
    user = relationship("Users")

class Favorites(Base):
    __tablename__ = 'favorites'
    
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False, primary_key=True)
    studyspot_name = Column(String(254), ForeignKey('studyspots.studyspot_name'), nullable=False, primary_key=True)
    studyspot = relationship("Studyspots")
    user = relationship("Users")

class Requests(Base):
    __tablename__="requests"
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False, primary_key=True)
    studyspot_name = Column(String(254), nullable=False, primary_key=True)
    university_name = Column(String(200), ForeignKey('universities.university_name'))
    request_is_indoor = Column(Boolean)
    request_ada = Column(Boolean)
    request_power_outlets = Column(Boolean)
    request_easy_to_find = Column(Boolean)
    request_image_url = Column(String(3000))
    request_location = Column(String(3000))
    request_noise_level = Column(Integer, nullable=False)
    request_crowdedness_level = Column(Integer, nullable=False)
    request_strong_wifi = Column(Boolean)
    request_reason = Column(String(3000))

    university = relationship("Universities")
    user = relationship("Users")

class Reported_studyspots(Base):
    __tablename__ = 'reported_studyspots'
    
    report_id = Column(Integer,nullable=False,primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    studyspot_name = Column(String(254), ForeignKey('studyspots.studyspot_name'), nullable=False)
    report_comment = Column(String(3000),nullable=False)
    studyspot = relationship("Studyspots")
    user = relationship("Users")

    
