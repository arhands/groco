CREATE TABLE "UserTable" (
  "id" SERIAL PRIMARY KEY,
  "user_name" varchar,
  "user_email" varchar,
  "password_hash" varchar,
  "shopping_list_id" int,
  "favorites_list_id" int
);

CREATE TABLE "MealPlanTable" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "name" varchar
);

CREATE TABLE "MealPlanRecipeTable" (
  "id" SERIAL PRIMARY KEY,
  "meal_plan_id" int,
  "recipe_id" int
);

CREATE TABLE "RecipeTable" (
  "id" SERIAL PRIMARY KEY,
  "creator_id" int,
  "name" varchar,
  "instructions" varchar,
  "ingredient_collection_id" int
);

CREATE TABLE "IngredientInstanceTable" (
  "id" SERIAL PRIMARY KEY,
  "collection_id" int,
  "ingredient_id" int,
  "quantity" double,
  "measurement_type" int
);

CREATE TABLE "IngredientTable" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "MeasurementTable" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "BrandTable" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "BrandIngredientTable" (
  "id" SERIAL PRIMARY KEY,
  "brand_id" int,
  "ingredient_id" int
);

ALTER TABLE "IngredientInstanceTable" ADD FOREIGN KEY ("collection_id") REFERENCES "UserTable" ("shopping_list_id");

ALTER TABLE "IngredientInstanceTable" ADD FOREIGN KEY ("collection_id") REFERENCES "UserTable" ("favorites_list_id");

ALTER TABLE "MealPlanTable" ADD FOREIGN KEY ("user_id") REFERENCES "UserTable" ("id");

ALTER TABLE "MealPlanRecipeTable" ADD FOREIGN KEY ("meal_plan_id") REFERENCES "MealPlanTable" ("id");

ALTER TABLE "MealPlanRecipeTable" ADD FOREIGN KEY ("recipe_id") REFERENCES "RecipeTable" ("id");

ALTER TABLE "RecipeTable" ADD FOREIGN KEY ("creator_id") REFERENCES "UserTable" ("id");

ALTER TABLE "IngredientInstanceTable" ADD FOREIGN KEY ("collection_id") REFERENCES "RecipeTable" ("ingredient_collection_id");

ALTER TABLE "IngredientInstanceTable" ADD FOREIGN KEY ("ingredient_id") REFERENCES "IngredientTable" ("id");

ALTER TABLE "IngredientInstanceTable" ADD FOREIGN KEY ("measurement_type") REFERENCES "MeasurementTable" ("id");

ALTER TABLE "BrandIngredientTable" ADD FOREIGN KEY ("brand_id") REFERENCES "BrandTable" ("id");

ALTER TABLE "BrandIngredientTable" ADD FOREIGN KEY ("ingredient_id") REFERENCES "IngredientTable" ("id");

INSERT INTO UserTable(user_name,user_email) VALUES("Billy Bob","Bill@bobs.io")
INSERT INTO UserTable(user_name,user_email) VALUES("France","Russia@Ukraine.gov")