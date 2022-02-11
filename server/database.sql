CREATE DATABASE GrocoDatabase;

CREATE TABLE IngredientTable (
  id SERIAL PRIMARY KEY,
  name varchar UNIQUE
);

CREATE TABLE MeasurementTable (
  id SERIAL PRIMARY KEY,
  name varchar UNIQUE
);

CREATE TABLE BrandTable (
  id SERIAL PRIMARY KEY,
  name varchar UNIQUE
);
CREATE TABLE BrandIngredientTable (
  id SERIAL PRIMARY KEY,
  brand_id int REFERENCES BrandTable(id),
  ingredient_id int REFERENCES IngredientTable(id)
);
CREATE TABLE UserTable (
  id SERIAL PRIMARY KEY,
  user_name varchar,
  user_email varchar UNIQUE,
  password_hash varchar,
  shopping_list_id int UNIQUE,
  favorites_list_id int UNIQUE
);
CREATE TABLE MealPlanTable (
  id SERIAL PRIMARY KEY,
  name varchar,
  user_id SERIAL REFERENCES UserTable(id)
);
CREATE TABLE RecipeTable (
  id SERIAL PRIMARY KEY,
  creator_id int REFERENCES UserTable(id),
  name varchar,
  instructions varchar,
  ingredient_collection_id int UNIQUE
);
CREATE TABLE MealPlanRecipeTable (
  id SERIAL PRIMARY KEY,
  meal_plan_id int REFERENCES MealPlanTable(id),
  recipe_id int REFERENCES RecipeTable(id)
);
CREATE TABLE IngredientInstanceTable (
  id SERIAL PRIMARY KEY,
  collection_id int,
  ingredient_id int REFERENCES IngredientTable(id),
  quantity float,
  measurement_type int REFERENCES MeasurementTable(id)
);