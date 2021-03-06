const pool = require("../db");

// get all grocery
async function getAllGrocery(req, res) {
    try {
        const allGrocery = await pool.query("SELECT * FROM public.ingredient_table");
        res.json(allGrocery.rows);
    } catch (err) {
        console.log(err.message);
    }
}

// get all brands
async function getAllBrand(req, res) {
    try {
        const allBrand = await pool.query("SELECT * FROM public.brand_table ORDER BY name ASC");
        res.json(allBrand.rows);
    } catch (err) {
        console.log(err.message);
    }
}

// get all measurements
async function getAllMeas(req, res) {
    try {
        const allMeas = await pool.query("SELECT * FROM public.measurement_table");
        res.json(allMeas.rows);
    } catch (err) {
        console.log(err.message);
    }
}

// set collection ID
async function setListId(req, res) {
    try {
        const { maxCollectId } = req.body;
        const { googleId } = req.params;
        const update = await pool.query("UPDATE public.user_table SET shopping_list_id = $1 WHERE googleid = $2 RETURNING first_name",
            [maxCollectId, googleId]);
        res.json(update.rows);
    } catch (err) {
        console.log(err.message);
    }
}

// add item to list
async function addItemToList(req, res) {
    var { grocoId, quantity, measurementId, brandId } = req.body;
    console.log(req.body);
    var { googleID } = req.params;
    quantity = parseFloat(quantity);
    var listId = null;
    var maxShop = null;
    var maxFav = null;

    // get shopping list id
    try {
        listId = (await pool.query("SELECT shopping_list_id FROM public.user_table WHERE googleid = $1", [googleID])).rows[0].shopping_list_id;
    } catch (err) {
        console.log("cant get shopping_list_id");
        console.log(err.message);
    }

    //if shopping list id === null -> get max collection id
    if (listId === null) {
        try {
            listId = (await pool.query("SELECT MAX(collection_id) FROM public.ingredient_instance_table")).rows[0].max;
            maxShop = (await pool.query("SELECT MAX(shopping_list_id) FROM public.user_table")).rows[0].max;
            maxFav = (await pool.query("SELECT MAX(shopping_list_id) FROM public.user_table")).rows[0].max;
        } catch (err) {
            console.log("error max collect");
            console.log(err.message);
        }
        // find max id from instance, shop and fav ids
        if (listId < maxShop) listId = maxShop;
        if (listId < maxFav) listId = maxFav;
        listId = listId + 1;
        console.log(listId);

        // set new shopping list id
        try {
            const update = await pool.query("UPDATE public.user_table SET shopping_list_id = $1 WHERE googleid = $2", [listId, googleID]);
        } catch (err) {
            console.log("error update list id");
            console.log(err.message);
        }
    }

    try {
        const itemAdd = await pool.query(
            "INSERT INTO public.ingredient_instance_table (collection_id, ingredient_id, quantity, measurement_type, brand_id) VALUES ($1, $2, $3, $4, $5)",
            [listId, grocoId, quantity, measurementId, brandId]);
        res.json(itemAdd.rows);
        console.log(itemAdd.rows)
        console.log("listId = " + listId);
    } catch (err) {
        console.log("error grocery add");
        console.log(err.message);
    }
}

module.exports = {
    getGrocery: getAllGrocery,
    getBrand: getAllBrand,
    getMeas: getAllMeas,
    setList: setListId,
    addItem: addItemToList,
};