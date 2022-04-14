const pool = require("../db");

// get all favorites items
async function getFavs(req, res) {
    const { googleID } = req.params;
    var favId = null;

    // get fav id
    try {
        favId = (await pool.query("SELECT favorites_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].favorites_list_id;
    } catch(err) {
        console.log("cannot get user's favorite list id");
        console.log(err.message);
    }

    // get favorite items
    try {
        const favs = await pool.query("SELECT a.name, a.id FROM public.ingredient_table a JOIN public.ingredient_instance_table b on a.id = b.id AND b.collection_id = $1", [favId]);
        res.json(favs.rows);
    } catch(err) {
        console.log("Unable to get favorite items.");
        console.log(err.message);
    }
}

async function addFav(req, res) {
    const { grocoId } = req.body;
    var { googleID } = req.params;
    var favId = null;

    // get list id
    try {
        favId = (await pool.query("SELECT favorites_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].favorites_list_id;
    } catch(err) {
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
            const update = await pool.query("UPDATE public.user_table SET favorites_list_id = $1 WHERE googleid = $2", [favId, googleId]);
        } catch (err) {
            console.log("error update fav list id");
            console.log(err.message);
        }
    }

    // add item to list
    try {
        const itemAdd = await pool.query(
            "INSERT INTO public.ingredient_instance_table (collection_id, ingredient_id) VALUES ($1, $2)",
            [favId, grocoId]);
        res.json(itemAdd.rows);
        console.log(itemAdd.rows)
    } catch(err) {
        console.log("Unable to add favorite item");
        console.log(err.message);
    }
}

// delete item from fav list
async function deleteFav(req, res) {
    const { grocoId } = req.body;
    var { googleID } = req.params;
    var favId = null;

    // get list id
    try {
        favId = (await pool.query("SELECT favorites_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].favorites_list_id;
    } catch(err) {
        console.log("cannot get user's favorite list id");
        console.log(err.message);
    }

    try {
        const del = await pool.query("DELETE FROM public.ingredient_instance_table WHERE collection_id = $1 AND ingredient_id = $2", [favId, grocoId]);
    } catch(err) {
        console.log("Unable to delete from fav list");
        console.log(err.message);
    }
}

module.exports = {
    getFavs: getFavs,
    addFav: addFav,
    deleteFav: deleteFav
};