const pool = require("../db");
const shopAlg = require("./ShopSearchAlgorithm.js");
async function getShoppingRoute(req, res) {
  try {
      let { googleid, maxStores, maxDistance, itemCostWeight, itemDistanceWeight, latitude, longitude} = req.body;
      const results = await pool.query(
          "SELECT I.name AS name, quantity, B.name AS brand, M.name as measurement_type " +
            "FROM user_table U, ingredient_instance_table II, measurement_table M, ingredient_table I, brand_table B " +
            "WHERE U.googleid = $1 " +
              "AND U.shopping_list_id = II.collection_id " +
              "AND II.ingredient_id = I.id " +
              "AND II.measurement_type = M.id " +
              "AND II.brand_id = B.id ",
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