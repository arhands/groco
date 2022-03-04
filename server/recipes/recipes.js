const pool = require("../db");
async function getAllRecipes(req, res) {
  try {
      const recipes = await pool.query(
          "SELECT user_email as creator, R.name as name, R.id as id " +
          "FROM user_table U, recipe_table R " +
          "WHERE U.user_id = R.id"
      );
      res.json(recipes);
  } catch (err) {
      console.log(err.message);
  }
}
async function getRecipeDetails(req, res) {
  try {
      const { recipeid } = req.params;
      const {instructions, collection_id} = await pool.query(
          "SELECT instructions, ingredient_collection_id " +
          "FROM recipe_table " +
          "WHERE id = $1",
          [recipeid]
      )[0];
      // getting ingredients
      const ingredients = await pool.query(
        "SELECT I.name AS name, quantity, M.name as measurement_type " +
          "FROM ingredient_table I, ingredient_instance_table, measurement_table M " +
          "WHERE I.collection_id = $1 " +
            "AND I.ingredient_id = II.id " +
            "AND I.measurement_type = M.id",
        [collection_id]
      );
      res.json({instructions: instructions, ingredients: ingredients});
  } catch (err) {
      console.log(err.message);
  }
}
async function postRecipe(req, res) {
  try {
      // ingredients: [{ingredient_id, measurement_type (id), quantity}...]
      const { creator_id, ingredients, instructions, name } = req.params;
      // TODO: make sure a collision doesn't happen with this collection ID
      const collection_id = await pool.query(
        "SELECT MAX(collection_id) " +
        "FROM ingredient_instance_table"
      )[0].collection_id + 1;
      for(let ingredient in ingredients)
      {
        await pool.query(
          "INSERT INTO ingredient_instance_table (collection_id, ingredient_id, quantity, measurement_type)" +
          "VALUES ($1, $2, $3, $4)",
          [collection_id, ingredient.ingredient_id, ingredient.quantity, ingredient.measurement_type]
        );
      }
      const recipe_id = await pool.query(
        "INSERT INTO recipe_table (creator_id, name, instructions, ingredient_collection_id) " +
        "VALUES ($1, $2, $3, $4)",
        [creator_id, name, instructions, collection_id]
      )[0].id;
      res.json({recipeid: recipe_id});
  } catch (err) {
      console.log(err.message);
  }
}
module.exports = {
  getAll: getAllRecipes,
  getDetail: getRecipeDetails,

};