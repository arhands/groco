const pool = require("../db");
async function getShoppingList(res, req) {
  try {
      const { user_id, name } = req.body;
      const newMealPlan = await pool.query(
          "SELECT I.name AS name, quantity, B.name AS brand, M.name as measurement_type" +
            "FROM user_table U, ingredient_instance_table II, measurement_table M, ingredient_table I, brand_table B" +
            "WHERE U.id = $1" +
              "AND U.shopping_list_id = II.collection_id" +
              "AND II.ingredient_id = I.id" +
              "AND II.measurement_type = M.id" +
              "AND II.brand_id = B.id",
          [user_id]
      );
      res.json(newMealPlan.rows[0]);
  } catch (err) {
      console.log(err.message);
  }
}
module.exports = {
  get: getShoppingList,
};