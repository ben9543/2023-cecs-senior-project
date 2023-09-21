# Backend Documentation

## Installation

### 1. Create the virtual environment (don't follow this if you have anaconda installed)

```bash
# Windows
python -m venv env

# Mac
python3 -m venv env
```

### 2. Activate the virtual environment (don't follow this if you have anaconda installed)

```bash
# Windows 
./env/Script/activate
```

### 3. Set up the local database

- Install postgreSQL if you don't have.
- Open terminal and type `psql`. Login with your credential.
- Run `create database test`.
- Modify `user` & `password` variables accordingly in `app.py`.
- Open PgAdmin or any IDE you like, connect to your database and run the SQL commands in `/backend/db/main_table.sql`
- Insert some data to test.

### 4. Install dependencies

- After you activate your virtual environment, do

```
pip install -r requirements.txt
```

### 5. Run the server

```
python app.py
```

## Backend Dev Note 

#### Flaks-SQLAlchemy Join
- [Link](https://stackoverflow.com/questions/21996288/join-multiple-tables-in-sqlalchemy-flask)


#### Attributes
- Features: list
- Location: String
- Indoor / outdoor: Boolean
- Noise Level: From 1 to 5 (Float) => avg
- Crowdedness Level: From 1 to 5 (Float) => avg
- Strong WiFi: 1 to 3 (Float) => avg
- Temperature: 1 to 3 (Float) => avg
- Rate: Rating
- Power outlets (optional)
- ADA Accessible (optional)
- Easy to find (optional)

#### API
- `/studyspots`: POST
- `/studyspots`: GET
- `/studyspots`: PUT
- `/studyspots`: DELETE
- `/studyspots/search`: POST
- `/studyspots/:id`: GET

