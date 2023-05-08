from sqlalchemy import Column, Date, Float, Integer, String, create_engine
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime




#engine = create_engine('mysql://user:password@server', echo=True)

Base = declarative_base()


class Account(Base):
    __tablename__ = 'UserAuthentication'

    username = Column(String(30), primary_key=True)
    password = Column(String(30))
    


Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()



def account_to_db(username, password):
    # created_at = datetime.now() 

    data = Account(username=username, password=password)

    session.add(data)
    session.commit()

account_to_db("test1","pw1")
account_to_db("test2","pw2")

# class StudySpots(Base):
#     __tablename__ = 'StudySpotsList'

# class UsertoSpots(Base):
#     __tablename__ = 'UsertoSpots'


# class Reviews(Base):
#     __tablename__ = 'ReviewList'

# class UsertoReviews(Base):
#     __tablename__ = 'UsertoReviews'