from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Universities(Base):
    __tablename__ = 'universities'

    university_id = Column(Integer, primary_key=True)
    university_name = Column(String(200))
    university_state = Column(String(2))
    university_zip = Column(Integer, nullable=False, unique=True)

class Studyspots(Base):
    __tablename__ = 'studyspots'

    studyspot_id = Column(Integer, primary_key=True)
    studyspot_name = Column(String(254), unique=True)

class Users(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    user_email = Column(String(254))
    user_name = Column(String(200))
    password = Column(String(512))
    university_id = Column(Integer, ForeignKey('universities.university_id'), nullable=False)
    user_photo = Column(String(250))

    university = relationship("Universities")

class Surveys(Base):
    __tablename__ = 'surveys'

    survey_id = Column(Integer, primary_key=True)
    studyspot_id = Column(Integer, ForeignKey('studyspots.studyspot_id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    survey_crowdednes_level = Column(Integer, nullable=False)
    survey_noise_level = Column(Integer, nullable=False)

    studyspot = relationship("Studyspots")
    user = relationship("Users")

class Reviews(Base):
    __tablename__ = 'reviews'

    review_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    studyspot_id = Column(Integer, ForeignKey('studyspots.studyspot_id'), nullable=False)
    review_comments = Column(String(200))
    review_indoor = Column(Boolean)
    review_wifi = Column(Integer, nullable=False)
    review_temp = Column(Integer, nullable=False)
    review_rate = Column(Float, nullable=False)
    review_ada = Column(Boolean)
    review_power_outlets = Column(Boolean)
    review_easy_to_find = Column(Boolean)

    studyspot = relationship("Studyspots")
    user = relationship("Users")

# class Favorites(Base):
#     __tablename__ = 'favorites'

#     user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
#     studyspot_id = Column(Integer, ForeignKey('studyspots.studyspot_id'), nullable=False)

#     UniqueConstraint('user_id', 'studyspot_id', name='pk_fav')
    
#     studyspot = relationship("Studyspots")
#     user = relationship("Users")
