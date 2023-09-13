CREATE TABLE Users (
    user_id INT NOT NULL, 
    user_email VARCHAR(254),
    user_name VARCHAR(200),
    password VARCHAR(512),
    university_id INT NOT NULL,
    user_photo VARCHAR(250),
    PRIMARY KEY (user_id),
    FOREIGN KEY (university_id) REFERENCES Universities(university_id)
    --user_firstname VARCHAR(200)
    --user_lastname VARCHAR(200)
    --Recently Visited spots?

);

CREATE TABLE Universities (
    university_id INT NOT NULL,
    PRIMARY KEY (university_id),
    university_name VARCHAR(200),
    university_state VARCHAR(2),
    university_zip INT NOT NULL
);

CREATE TABLE Studyspots (
    studyspot_id INT NOT NULL,
    PRIMARY KEY (studyspot_id),
    university_id INT NOT NULL,
    FOREIGN KEY (university_id) REFERENCES Universities(university_id),
    studyspot_name VARCHAR(200),
    /*studyspot_indoor BOOLEAN, /*indoor: TRUE, outdoor: FALSE*/*/
    studyspot_photo VARCHAR(250),
    studyspot_address VARCHAR(250)

);

CREATE TABLE Surveys (
    survey_id INT NOT NULL,
    studyspot_id INT NOT NULL,
    PRIMARY KEY (survey_id, studyspot_id), 
    survey_crowdednes_level INT NOT NULL, /*1, 2, 3, 4, 5 range*/
    survey_noise_level INT NOT NULL, /*1, 2, 3, 4, 5 range*/
    survey_temp INT NOT NULL, /*1, 2, 3 range*/ 
    FOREIGN KEY (studyspot_id) REFERENCES Studyspots(studyspot_id)
);

CREATE TABLE Reviews (
    user_id INT NOT NULL,
    review_id INT NOT NULL,
    studyspot_id INT NOT NULL,
    PRIMARY KEY (studyspot_id, user_id), 
    review_comments VARCHAR(200),
    review_indoor BOOLEAN, /*indoor: TRUE, outdoor: FALSE*/
    review_wifi INT NOT NULL, /*1, 2, 3 range*/
    review_rate FLOAT NOT NULL, /*1, 2, 3, 4, 5 range*/
    review_ada BOOLEAN, /*ADA accommodation: TRUE, NO ADA: FALSE*/
    review_power_outlets BOOLEAN,
    review_easy_to_find BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (studyspot_id) REFERENCES Studyspots(studyspot_id)
);

CREATE TABLE Favorites (
    user_id INT NOT NULL,
    studyspot_id INT NOT NULL,
    PRIMARY KEY (studyspot_id, user_id), 
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (studyspot_id) REFERENCES Studyspots(studyspot_id)
);


-- Features: list
-- Location: String
-- Indoor / outdoor: Boolean
-- Noise Level: From 1 to 5 (Float) => avg
-- Crowdedness Level: From 1 to 5 (Float) => avg
-- Strong WiFi: 1 to 3 (Float) => avg
-- Temperature: 1 to 3 (Float) => avg
-- Rate: Rating
-- Power outlets (optional)
-- ADA Accessible (optional)
-- Easy to find (optional)