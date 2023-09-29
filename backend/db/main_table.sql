CREATE TABLE IF NOT EXISTS Universities (
    university_name VARCHAR(200),
    university_state VARCHAR(2),
    university_zip INT NOT NULL
    UNIQUE (university_name),
);

CREATE TABLE IF NOT EXISTS Studyspots (
    studyspot_id INT NOT NULL,
    studyspot_name VARCHAR(254),
    university_name VARCHAR(200),
    is_indoor BOOLEAN, 
    image_url VARCHAR(3000),
    UNIQUE(studyspot_name),
    CONSTRAINT FK_studyspot_university FOREIGN KEY (university_name) REFERENCES Universities(university_name)
);

CREATE TABLE IF NOT EXISTS Users (
    user_id INT NOT NULL, 
    user_email VARCHAR(254),
    user_name VARCHAR(200),
    password VARCHAR(512),
    university_name VARCHAR(200) NOT NULL,
    user_photo VARCHAR(250),
    UNIQUE (user_id),
	CONSTRAINT FK_user_university FOREIGN KEY (university_name) REFERENCES Universities(university_name)
);

CREATE TABLE IF NOT EXISTS Surveys (
    survey_id INT NOT NULL,
    studyspot_id INT NOT NULL,
	user_id INT NOT NULL,
    survey_crowdednes_level INT NOT NULL, 
    survey_noise_level INT NOT NULL,
    UNIQUE (survey_id),
	CONSTRAINT FK_survey_studyspot FOREIGN KEY (studyspot_id) REFERENCES Studyspots(studyspot_id),
    CONSTRAINT FK_survey_user FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Reviews (
	review_id INT NOT NULL,
    user_id INT NOT NULL,
    studyspot_id INT NOT NULL,
    review_comments VARCHAR(500),
    review_wifi INT NOT NULL, /*1, 2, 3 range*/
    review_temp INT NOT NULL, /*1, 2, 3 range*/
    review_rate FLOAT NOT NULL, /*1, 2, 3, 4, 5 range*/
    review_ada BOOLEAN, /*ADA accommodation: TRUE, NO ADA: FALSE*/
    review_power_outlets BOOLEAN,
    review_easy_to_find BOOLEAN,
    UNIQUE(review_id),
	CONSTRAINT FK_review_studyspot FOREIGN KEY (studyspot_id) REFERENCES Studyspots(studyspot_id),
    CONSTRAINT FK_review_user FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Favorites (
    user_id INT NOT NULL,
    studyspot_id INT NOT NULL,
    CONSTRAINT PK_fav PRIMARY KEY (user_id, studyspot_id), 
	CONSTRAINT FK_review_studyspot FOREIGN KEY (studyspot_id) REFERENCES Studyspots(studyspot_id),
    CONSTRAINT FK_review_user FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Default Values
INSERT INTO Universities(university_name, university_state, university_zip)
VALUES('CSULB', 'CA', 90840)
