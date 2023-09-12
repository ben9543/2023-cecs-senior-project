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

CREATE TABLE Surveys (
    surveys_id INT NOT NULL,
    studyspots_id INT NOT NULL,
    PRIMARY KEY (surveys_id, studyspots_id), 
    survey_crowdedness_level INT NOT NULL, /*1, 2, 3, 4, 5 range*/
    survey_noise_level INT NOT NULL, /*1, 2, 3, 4, 5 range*/
    FOREIGN KEY (studyspots_id) REFERENCES Studyspots(studyspots_id)
);

CREATE TABLE Reviews (
    users_id INT NOT NULL,
    reviews_id INT NOT NULL,
    studyspots_id INT NOT NULL,
    PRIMARY KEY (studyspots_id, users_id), 
    reviews_comments VARCHAR(200),
    reviews_indoor BOOLEAN, /*indoor: TRUE, outdoor: FALSE*/
    reviews_wifi INT NOT NULL, /*1, 2, 3 range*/
    reviews_temp INT NOT NULL, /*1, 2, 3 range*/
    reviews_rate FLOAT NOT NULL, /*1, 2, 3, 4, 5 range*/
    reviews_ada BOOLEAN, /*ADA accommodation: TRUE, NO ADA: FALSE*/
    reviews_power_outlets BOOLEAN,
    reviews_easy_to_find BOOLEAN,
    FOREIGN KEY (users_id) REFERENCES Users(users_id),
    FOREIGN KEY (studyspots_id) REFERENCES Studyspots(studyspots_id)
);

CREATE TABLE Favorites (
    users_id INT NOT NULL,
    studyspots_id INT NOT NULL,
    PRIMARY KEY (studyspots_id, users_id), 
    FOREIGN KEY (users_id) REFERENCES Users(users_id),
    FOREIGN KEY (studyspots_id) REFERENCES Studyspots(studyspots_id)
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