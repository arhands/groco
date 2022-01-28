/* just to store all useful commands */

CREATE DATABASE grocotest;

CREATE TABLE mealplan (
    mealplan_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name VARCHAR(255)
);

SELECT * from mealplan;
INSERT INTO mealplan (name) VALUES ('3 days plan');