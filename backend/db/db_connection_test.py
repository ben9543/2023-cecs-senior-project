from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

user = "ben"
password = "12341234"
hostname = "127.0.0.1"
database_name = "senior_proj_test"


# Create a SQLAlchemy engine and connect to your database
engine = create_engine(f"postgresql+psycopg2://{user}:{password}@{hostname}/{database_name}")

Base = declarative_base()

# Define the Universities table
class University(Base):
    __tablename__ = 'universities'

    university_id = Column(Integer, primary_key=True)
    university_name = Column(String(200))
    university_state = Column(String(2))
    university_zip = Column(Integer, nullable=False)

# Define the Users table
class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    user_email = Column(String(254))
    user_name = Column(String(200))
    password = Column(String(512))
    university_id = Column(Integer, ForeignKey('universities.university_id'))
    user_photo = Column(String(250))

    university = relationship('University')

# Define the Studyspots table
class Studyspot(Base):
    __tablename__ = 'studyspots'

    studyspots_id = Column(Integer, primary_key=True)
    university_id = Column(Integer, ForeignKey('universities.university_id'))
    spot_name = Column(String(200))

    university = relationship('University')

# Define the Surveys table
class Survey(Base):
    __tablename__ = 'surveys'

    surveys_id = Column(Integer, primary_key=True)
    studyspots_id = Column(Integer, ForeignKey('studyspots.studyspots_id'))
    survey_name = Column(String(200))
    survey_indoor = Column(Boolean)
    survey_noise_level = Column(Integer)
    survey_wifi = Column(Integer)
    survey_temp = Column(Integer)
    survey_rate = Column(Float)
    survey_ada = Column(Boolean)
    survey_power_outlets = Column(Boolean)
    survey_easy_to_find = Column(Boolean)

    studyspot = relationship('Studyspot')

# Create the tables in the database
Base.metadata.create_all(engine)

