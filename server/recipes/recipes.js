const pool = require("../db");
async function getAllRecipes(req, res) {
  try {
      const recipes = (await pool.query(
          "SELECT user_email as creator, R.name as name, R.id as id " +
          "FROM user_table U, recipe_table R " +
          "WHERE U.id = R.creator_id"
      )).rows;
      res.json(recipes);
  } catch (err) {
      console.log(err.message);
  }
}
async function getRecipeDetails(req, res) {
  try {
      const { recipeId } = req.params;
      const {instructions, ingredient_collection_id} = (await pool.query(
          "SELECT instructions, ingredient_collection_id " +
          "FROM recipe_table " +
          "WHERE id = $1",
          [recipeId]
      )).rows[0];
      // getting ingredients
      const ingredients = (await pool.query(
        "SELECT I.name AS name, quantity, M.name as measurement_type " +
          "FROM ingredient_table I " +
          "JOIN ingredient_instance_table II ON I.id = II.ingredient_id " +
          "JOIN measurement_table M ON M.id = II.measurement_type " +
          "WHERE II.collection_id = $1",
        [ingredient_collection_id]
      )).rows;
      res.json({instructions: instructions, ingredients: ingredients});
  } catch (err) {
      console.log(err.message);
  }
}
async function postRecipe(req, res) {
  try {
      // ingredients: [{ingredient_id, measurement_type (id), quantity}...]
      const { googleid, ingredients, instructions, name } = req.body;
      // TODO: make sure a collision doesn't happen with this collection ID
      const collection_id = (await pool.query(
        "SELECT MAX(collection_id) + 1 id " +
        "FROM ingredient_instance_table"
      )).rows[0].id;
      const creator_id = (await pool.query(
        "SELECT id FROM user_table WHERE googleid = $1",[googleid]
      )).rows[0].id;
      for(let ingredient in ingredients)
      {
        await pool.query(
          "INSERT INTO ingredient_instance_table (collection_id, ingredient_id, quantity, measurement_type)" +
          "VALUES ($1, $2, $3, $4)",
          [collection_id, ingredient.ingredient_id, ingredient.quantity, ingredient.measurement_type]
        );
      }
      const recipe_id = (await pool.query(
        "INSERT INTO recipe_table (creator_id, name, instructions, ingredient_collection_id) " +
        "VALUES ($1, $2, $3, $4) RETURNING id",
        [creator_id, name, instructions, collection_id]
      )).rows[0].id;
      res.json({recipeid: recipe_id});
  } catch (err) {
      console.log(err.message);
  }
}
async function getIngredientOptions(req, res) {
  try {
      const brands = (await pool.query("SELECT id, name FROM brand_table")).rows;
      const measurement_types = (await pool.query("SELECT id, name FROM measurement_table")).rows;
      res.json({brands: brands, measurementtypes: measurement_types});
  } catch (err) {
      console.log(err.message);
  }
}
module.exports = {
  getAll: getAllRecipes,
  getDetail: getRecipeDetails,
  post: postRecipe,
  getIngredientOptions: getIngredientOptions
};