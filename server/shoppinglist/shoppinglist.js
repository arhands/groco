const pool = require("../db");
async function getShoppingList(req, res) {
  try {
    const { googleID } = req.params;
    var listId = null;

    // get shopping list id
    try {
        listId = (await pool.query("SELECT shopping_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].shopping_list_id;
    } catch(err) {
        console.log("cannot get user's shopping list id");
        console.log(err.message);
    }

    // get shopping list items
    try {
        const sList = await pool.query("SELECT b.id as instID, a.name, a.id as grocid, c.name as bname, b.brand_id, d.name as meas, b.measurement_type, b.quantity " +
            "FROM public.ingredient_table a " + 
            "JOIN public.ingredient_instance_table b on a.id = b.ingredient_id AND b.collection_id = $1 " + 
            "LEFT JOIN public.brand_table as c on c.id = b.brand_id " +
            "JOIN public.measurement_table d on d.id = b.measurement_type", [listId]);
        res.json(sList.rows);
    } catch(err) {
        console.log("Unable to get shopping list items.");
        console.log(err.message);
    }
  
  } catch (err) {
      console.log(err.message);
  }
}

async function deleteItem(req, res) {
  const { instId } = req.body;
  try {
      const del = await pool.query("DELETE FROM public.ingredient_instance_table WHERE id = $1 ", [instId]);
      res.json(del.rows);
  } catch(err) {
      console.log("Unable to delete from shopping list");
      console.log(err.message);
  }
}

async function clearList(req, res) {
  const { googleID } = req.params;
    var listId = null;

    // get shopping list id
    try {
        listId = (await pool.query("SELECT shopping_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].shopping_list_id;
        console.log(listId);
    } catch(err) {
        console.log("cannot get user's shopping list id");
        console.log(err.message);
    }

    // clear list
    try {
      const clear = await pool.query("DELETE FROM public.ingredient_instance_table WHERE collection_id = $1", [listId]);
      res.json(clear.rows);
    } catch {
      console.log("Unable to clear shopping list");
      console.log(err.message);
    }

}
module.exports = {
  get: getShoppingList,
  delete: deleteItem,
  clear: clearList
};