CREATE TABLE IF NOT EXISTS Universities (
    university_name VARCHAR(200),
    university_state VARCHAR(2),
    university_zip INT NOT NULL,
    UNIQUE (university_name)
);

CREATE TABLE IF NOT EXISTS Studyspots (
    studyspot_id INT NOT NULL,
    studyspot_name VARCHAR(254),
    university_name VARCHAR(200),
    studyspot_is_indoor BOOLEAN, 
    studyspot_ada BOOLEAN, /*ADA accommodation: TRUE, NO ADA: FALSE*/
    studyspot_power_outlets BOOLEAN,
    studyspot_easy_to_find BOOLEAN,
    studyspot_image_url VARCHAR(3000),
    studyspot_location VARCHAR(3000),
    studyspot_noise_level INT NOT NULL,
    studspot_crowdedness_level INT NOT NULL,
    studyspot_strong_wifi BOOLEAN,
    studyspot_is_approved BOOLEAN,
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

CREATE TABLE IF NOT EXISTS Admins (
    admin_id INT NOT NULL, 
    admin_email VARCHAR(254),
    password VARCHAR(512),
    UNIQUE (admin_email)
);

CREATE TABLE IF NOT EXISTS Surveys (
    survey_id INT NOT NULL,
    studyspot_name VARCHAR(254) NOT NULL,
	user_id INT NOT NULL,
    survey_crowdednes_level INT NOT NULL, 
    survey_noise_level INT NOT NULL,
    survey_wifi INT NOT NULL,
    survey_created_at timestamptz NOT NULL DEFAULT now()
    UNIQUE (survey_id),
	CONSTRAINT FK_survey_studyspot FOREIGN KEY (studyspot_name) REFERENCES Studyspots(studyspot_name),
    CONSTRAINT FK_survey_user FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Reviews (
	review_id INT NOT NULL,
    user_id INT NOT NULL,
    studyspot_name VARCHAR(254) NOT NULL,
    review_comments VARCHAR(500),
    review_rate FLOAT NOT NULL, /*1, 2, 3, 4, 5 range*/
    UNIQUE(review_id),
	CONSTRAINT FK_review_studyspot FOREIGN KEY (studyspot_name) REFERENCES Studyspots(studyspot_name),
    CONSTRAINT FK_review_user FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Favorites (
    user_id INT NOT NULL,
    studyspot_name VARCHAR(254) NOT NULL,
    CONSTRAINT PK_fav PRIMARY KEY (user_id, studyspot_name), 
	CONSTRAINT FK_review_studyspot FOREIGN KEY (studyspot_name) REFERENCES Studyspots(studyspot_name),
    CONSTRAINT FK_review_user FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Requests (
    user_id INT NOT NULL,
    studyspot_name VARCHAR(254) NOT NULL,
    university_name VARCHAR(200),
    request_is_indoor BOOLEAN, 
    request_ada BOOLEAN, /*ADA accommodation: TRUE, NO ADA: FALSE*/
    request_power_outlets BOOLEAN,
    request_easy_to_find BOOLEAN,
    request_image_url VARCHAR(3000),
    request_location VARCHAR(3000),
    request_noise_level INT NOT NULL,
    request_crowdedness_level INT NOT NULL,
    request_strong_wifi BOOLEAN,
    request_reason VARCHAR(3000),
    CONSTRAINT PK_request PRIMARY KEY (user_id, studyspot_name), 
    CONSTRAINT FK_request_user FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT FK_request_university FOREIGN KEY (university_name) REFERENCES Universities(university_name)
);

CREATE TABLE IF NOT EXISTS Rejections (
    user_id INT NOT NULL,
    studyspot_name VARCHAR(254) NOT NULL,
    university_name VARCHAR(200),
    request_is_indoor BOOLEAN, 
    request_ada BOOLEAN, /*ADA accommodation: TRUE, NO ADA: FALSE*/
    request_power_outlets BOOLEAN,
    request_easy_to_find BOOLEAN,
    request_image_url VARCHAR(3000),
    request_location VARCHAR(3000),
    request_noise_level INT NOT NULL,
    request_crowdedness_level INT NOT NULL,
    request_strong_wifi BOOLEAN,
    request_reason VARCHAR(3000),
    CONSTRAINT PK_rejection PRIMARY KEY (user_id, studyspot_name), 
    CONSTRAINT FK_rejection_user FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT FK_rejection_university FOREIGN KEY (university_name) REFERENCES Universities(university_name)
);

CREATE TABLE IF NOT EXISTS Reported_studyspots(
    report_id INT NOT NULL,
    studyspot_name VARCHAR(254) NOT NULL,
    user_id INT NOT NULL,
    report_comment VARCHAR(3000) NOT NULL,
    UNIQUE(report_id),
    CONSTRAINT FK_report_user FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT FK_report_studyspot FOREIGN KEY(studyspot_name) REFERENCES Studyspots(studyspot_name)
);

-- Default Values
INSERT INTO Universities(university_name, university_state, university_zip)
VALUES('CSULB', 'CA', 90840);