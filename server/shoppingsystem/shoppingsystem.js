const pool = require("../db");
const shopAlg = require("./ShopSearchAlgorithm.js");
async function getShoppingRoute(req, res) {
  try {
      let { googleid, maxStores, maxDistance, itemCostWeight, itemDistanceWeight, latitude, longitude} = req.body;
      const results = await pool.query(
          "SELECT I.name AS name, quantity, B.name AS brand, M.name AS measurement_type " +
            "FROM user_table U " + 
            "JOIN ingredient_instance_table II ON II.collection_id = U.shopping_list_id " +
            "JOIN measurement_table M ON M.id = II.measurement_type " +
            "JOIN ingredient_table I ON I.id = II.ingredient_id " +
            "LEFT JOIN brand_table B ON B.id = II.brand_id " +
            "WHERE U.googleid = $1",
          [googleid]
      );
      // converting from miles to meters
      maxDistance *= 1609.34
      //
      const optimalRoute = await shopAlg.FindOptimalRoute(results.rows,maxStores,maxDistance,itemCostWeight,itemDistanceWeight,latitude,longitude)
      //
      console.log(21,optimalRoute)
      res.json(optimalRoute);
  } catch (err) {
      console.log(err.message);
  }
}
module.exports = {
  getShoppingRoute: getShoppingRoute,
};