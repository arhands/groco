const pool = require("../db");
import './ShopSearchAlgorithm'
export async function getShoppingRoute(req, res) {
  try {
      const { googleid, maxStores, maxDistance, itemCostWeight, itemDistanceWeight, latitude, longitude} = req.body;
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
      //
      const optimalRoute = await FindOptimalRoute(results.rows,maxStores,maxDistance,itemCostWeight,itemDistanceWeight,latitude,longitude)
      //
      res.json(optimalRoute);
  } catch (err) {
      console.log(err.message);
  }
}