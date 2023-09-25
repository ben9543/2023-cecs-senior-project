-- Fake INSERT statements for Studyspots table
INSERT INTO Studyspots (studyspot_id, studyspot_name, university_name)
VALUES
    (1, 'Library', 'CSULB'),
    (2, 'Coffee House', 'CSULB'),
    (3, 'Study Park', 'CSULB'),
	(4, 'Coffee Shop', 'CSULB');

-- Fake INSERT statements for Survey table
INSERT INTO Reviews (review_id, user_id, studyspot_name, review_comments, review_wifi, review_temp, review_rate, review_ada, review_power_outlets, review_easy_to_find)
VALUES
    (1, 1, 'Library', 'Great place to study!', 3, 2, 4.5, true, true, true),
    (2, 1, 'Coffee House', 'Nice ambiance but noisy', 2, 3, 3.5, false, true, false),
    (3, 1, 'Study Park', 'Quiet and peaceful', 3, 1, 4.8, true, false, true),
    (4, 1, 'Library', 'Spacious and quiet', 3, 2, 4.7, true, true, true),
    (5, 1, 'Coffee Shop', 'Good coffee, but limited seating', 2, 3, 3.2, false, true, false),
    (6, 1, 'Study Park', 'Beautiful outdoor spot', 3, 1, 4.9, true, false, true),
    (7, 1, 'Library', 'Great study environment', 3, 2, 4.6, true, true, true);