const pool = require("../db");

// get all favorites items
async function getFavs(req, res) {
    const { googleID } = req.params;
    var favId = null;

    // get fav id
    try {
        favId = (await pool.query("SELECT favorites_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].favorites_list_id;
    } catch(err) {
        console.log("getFav error");
        console.log("cannot get user's favorite list id");
        console.log(err.message);
    }

    // get favorite items
    try {
        const favs = await pool.query("SELECT b.id as instID, a.name, a.id as grocid, c.name as bname, b.brand_id, d.name as meas, b.measurement_type, b.quantity " +
            "FROM public.ingredient_table a " + 
            "JOIN public.ingredient_instance_table b on a.id = b.ingredient_id AND b.collection_id = $1 " + 
            "JOIN public.brand_table as c on c.id = b.brand_id " +
            "JOIN public.measurement_table d on d.id = b.measurement_type;", [favId]);
        res.json(favs.rows);
    } catch(err) {
        console.log("Unable to get favorite items.");
        console.log(err.message);
    }
}

async function addFav(req, res) {
    var { grocoId, quantity, measurementId, brandId } = req.body;
    var { googleID } = req.params;
    var favId = null;

    // get list id
    try {
        favId = (await pool.query("SELECT favorites_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].favorites_list_id;
    } catch(err) {
        console.log("addFav error");
        console.log("cannot get user's favorite list id");
        console.log(err.message);
    }



    // if fav list id === null -> get max collection id and set new fav id
    if(favId === null) {
        try {
            favId = (await pool.query("SELECT MAX(collection_id) FROM public.ingredient_instance_table")).rows[0].max;
        } catch(err) {
            console.log("error max collect");
            console.log(err.message);
        }
        
        // set new shopping list id
        try {
            const update = await pool.query("UPDATE public.user_table SET favorites_list_id = $1 WHERE googleid = $2", [favId, googleID]);
        } catch (err) {
            console.log("error update fav list id");
            console.log(err.message);
        }
    }

    // add item to list
    try {
        const itemAdd = await pool.query(
            "INSERT INTO public.ingredient_instance_table (collection_id, ingredient_id, quantity, measurement_type, brand_id) VALUES ($1, $2, $3, $4, $5)",
            [favId, grocoId, quantity, measurementId, brandId]);
        res.json(itemAdd.rows);
        console.log(itemAdd.rows)
    } catch(err) {
        console.log("Unable to add favorite item");
        console.log(err.message);
    }
}

// delete item from fav list
async function deleteFav(req, res) {
    const { instId } = req.body;

    try {
        const del = await pool.query("DELETE FROM public.ingredient_instance_table WHERE id = $1 ", [instId]);
    } catch(err) {
        console.log("Unable to delete from fav list");
        console.log(err.message);
    }
}

// add 1 item to shopping list
async function addShop(req, res) {

}

module.exports = {
    getFavs: getFavs,
    addFav: addFav,
    deleteFav: deleteFav
};