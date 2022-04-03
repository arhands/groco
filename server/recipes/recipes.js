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
        "SELECT I.name AS name, I.id as ingredient_id, quantity, M.name as measurement_type, M.id as measurement_id " +
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
async function addToShoppingList(req, res) {
  try {
      const { googleId, recipeId } = req.params;
      await pool.query(
        "INSERT INTO ingredient_instance_table (collection_id, ingredient_id, quantity, measurement_type) " +
        "(SELECT collection_id, ingredient_id, quantity, measurement_type " +
        "FROM (SELECT shopping_list_id collection_id FROM user_table WHERE googleid = $1) S, " +
        "(SELECT II.ingredient_id ingredient_id, quantity, II.id measurement_type " +
          "FROM ingredient_instance_table II " +
          "JOIN Recipe_table R ON II.collection_id = R.ingredient_collection_id " +
          "WHERE R.id = $2) I)",
        [googleId,recipeId]
      )
      //res.json({instructions: instructions, ingredients: ingredients});
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
      console.log("collection_id:",collection_id)
      const creator_id = (await pool.query(
        "SELECT id FROM user_table WHERE googleid = $1",[googleid]
      )).rows[0].id;
      for(let i = 0; i < ingredients.length; i++)
      {
        await pool.query(
          "INSERT INTO ingredient_instance_table (collection_id, ingredient_id, quantity, measurement_type)" +
          "VALUES ($1, $2, $3, $4)",
          [collection_id, ingredients[i].ingredient_id, ingredients[i].quantity, ingredients[i].measurement_type]
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
      const ingredients = (await pool.query("SELECT id, name FROM ingredient_table")).rows;
      const measurement_types = (await pool.query("SELECT id, name FROM measurement_table")).rows;
      res.json({ingredients: ingredients, measurementtypes: measurement_types});
  } catch (err) {
      console.log(err.message);
  }
}
module.exports = {
  getAll: getAllRecipes,
  getDetail: getRecipeDetails,
  post: postRecipe,
  getIngredientOptions: getIngredientOptions,
  addToShoppingList: addToShoppingList
};