/* just to store all useful commands */

CREATE DATABASE grocotest;

CREATE TABLE `UserTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_name` varchar(255),
  `user_email` varchar(255),
  `password_hash` varchar(255),
  `shopping_list_id` int,
  `favorites_list_id` int
);

CREATE TABLE `MealPlanTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `name` varchar(255)
);

CREATE TABLE `MealPlanRecipeTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `meal_plan_id` int,
  `recipe_id` int
);

CREATE TABLE `RecipeTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creator_id` int,
  `name` varchar(255),
  `instructions` varchar(255),
  `ingredient_collection_id` int
);

CREATE TABLE `IngredientInstanceTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `collection_id` int,
  `ingredient_id` int,
  `quantity` double,
  `measurement_type` int
);

CREATE TABLE `IngredientTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `MeasurementTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `BrandTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `BrandIngredientTable` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `brand_id` int,
  `ingredient_id` int
);

ALTER TABLE `IngredientInstanceTable` ADD FOREIGN KEY (`collection_id`) REFERENCES `UserTable` (`shopping_list_id`);

ALTER TABLE `IngredientInstanceTable` ADD FOREIGN KEY (`collection_id`) REFERENCES `UserTable` (`favorites_list_id`);

ALTER TABLE `MealPlanTable` ADD FOREIGN KEY (`user_id`) REFERENCES `UserTable` (`id`);

ALTER TABLE `MealPlanRecipeTable` ADD FOREIGN KEY (`meal_plan_id`) REFERENCES `MealPlanTable` (`id`);

ALTER TABLE `MealPlanRecipeTable` ADD FOREIGN KEY (`recipe_id`) REFERENCES `RecipeTable` (`id`);

ALTER TABLE `RecipeTable` ADD FOREIGN KEY (`creator_id`) REFERENCES `UserTable` (`id`);

ALTER TABLE `IngredientInstanceTable` ADD FOREIGN KEY (`collection_id`) REFERENCES `RecipeTable` (`ingredient_collection_id`);

ALTER TABLE `IngredientInstanceTable` ADD FOREIGN KEY (`ingredient_id`) REFERENCES `IngredientTable` (`id`);

ALTER TABLE `IngredientInstanceTable` ADD FOREIGN KEY (`measurement_type`) REFERENCES `MeasurementTable` (`id`);

ALTER TABLE `BrandIngredientTable` ADD FOREIGN KEY (`brand_id`) REFERENCES `BrandTable` (`id`);

ALTER TABLE `BrandIngredientTable` ADD FOREIGN KEY (`ingredient_id`) REFERENCES `IngredientTable` (`id`);

