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

CREATE TABLE Surveys(
    surveys_id INT NOT NULL,
    studyspots_id INT NOT NULL,
    PRIMARY KEY (studyspots_id), -- Creating two pk might not work need a review
    PRIMARY KEY (surveys_id),
    survey_name VARCHAR(200),
    survey_in_outdoor Boolean,
    survey_noise_level INT NOT NULL, --1,2,3,4,5 range
    survey_wifi INT NOT NULL, --1,2,3 range
    survey_temp INT NOT NULL, --1,2,3 range
    survey_rate FLOAT NOT NULL, --1,2,3,4,5 range
    survey_ada Boolean,

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