CREATE DATABASE groco_database; /*Uyen did, have to use lower case*/

CREATE TABLE Ingredient (
  id SERIAL PRIMARY KEY,
  name varchar UNIQUE
);

CREATE TABLE Measurement (
  id SERIAL PRIMARY KEY,
  name varchar UNIQUE
);

CREATE TABLE Brand (
  id SERIAL PRIMARY KEY,
  name varchar UNIQUE
);
CREATE TABLE BrandIngredient (
  id SERIAL PRIMARY KEY,
  brand_id int REFERENCES Brand(id),
  ingredient_id int REFERENCES Ingredient(id)
);
/* Uyen did, need to add public in front of every table*/
CREATE TABLE public.User (
  id SERIAL PRIMARY KEY,
  user_name varchar,
  user_email varchar UNIQUE,
  password_hash varchar,
  shopping_list_id int UNIQUE,
  favorites_list_id int UNIQUE
); 
/* Uyen did*/
CREATE TABLE public.MealPlan (
  id SERIAL PRIMARY KEY,
  name varchar,
  user_id SERIAL REFERENCES public.User(id)
);
/* Uyen did*/
CREATE TABLE public.Recipe (
  id SERIAL PRIMARY KEY,
  creator_id int REFERENCES public.User(id),
  name varchar,
  instructions varchar,
  ingredient_collection_id int UNIQUE
);
/* Uyen did*/
CREATE TABLE public.MealPlanRecipe (
  id SERIAL PRIMARY KEY,
  meal_plan_id int REFERENCES public.MealPlan(id),
  recipe_id int REFERENCES public.Recipe(id)
);
CREATE TABLE IngredientInstance (
  id SERIAL PRIMARY KEY,
  collection_id int,
  ingredient_id int REFERENCES Ingredient(id),
  quantity float,
  measurement_type int REFERENCES Measurement(id)
);