const pool = require ("../db.js");

async function getShoppingListItems(req, res)
{
    // let { quantity, measurementId, brandId} = req.body;
     let googleID = req.params;
   
    

    try{
        shoppingListId = (await pool.query("SELECT shopping_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].shopping_list_id;
       
        const allShoppingItems = await pool.query("SELECT brand_id, quantity, measurement_type FROM public.ingredient_instance_table WHERE collection_id = $1", [shoppingListId]);
    
        res.json(allShoppingItems.rows);
      
     }
    catch (err){
        console.log(err.message);
    }

}

module.exports={
    get: getShoppingListItems,
}