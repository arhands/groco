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
        const allBrand = await pool.query("SELECT * FROM public.brand_table");
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

// get max collection id
async function getMaxCollect(req, res) {
    try {
        const maxCollect = await pool.query("SELECT MAX(collection_id) FROM public.ingredient_instance_table");
        console.log(maxCollect);
        res.json(maxCollect.rows);
    } catch(err) {
        console.log(err.message);
    }
}

// set collection ID
async function setListId(req, res) {
    try {
        const { maxCollectId } = req.body;
        const { googleId } = req.params;
        const update = pool.query("UPDATE public.user_table SET shopping_list_id = $1 WHERE googleid = $2 RETURNING first_name", 
            [maxCollectId, googleId]);
        res.json(update.rows);
    } catch(err) {
        console.log(err.message);
    }
}

// add item to list
async function addItemToList(req, res) {
    try {
        const { listId, grocoId, quantity, measurementId, brandId } = req.body;
        const itemAdd = pool.query(
            "INSERT INTO public.ingredient_instance_table (collection_id, ingredient_id, quantity, measurement_type, brand_id) VALUES ($1, $2, $3, $4, $5)",
            [listId, grocoId, quantity, measurementId, brandId]);
        res.json(itemAdd.rows);
        console.log(itemAdd.rows)
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = {
    getGrocery: getAllGrocery,
    getBrand: getAllBrand,
    getMeas: getAllMeas,
    getCollection: getMaxCollect,
    setList: setListId,
    addItem: addItemToList,
};