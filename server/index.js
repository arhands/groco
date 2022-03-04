const express = require("express");
const app = express();
const cors = require("cors");
const mealplans = require("./mealplans/mealplans");
const shoppinglist = require("./shoppinglist/shoppinglist");
const user = require("./user/user")
const port = process.env.PORT || 3001
const pool = require("./db");
// var bodyParser = require('body-parser');
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ROUTES
// need to create database and table using psql first
app.post("/mealplans", mealplans.create)
// get all mealplan
app.get("/mealplans", mealplans.getAll);
// get a mealplan
app.get("/mealplans/:id", mealplans.get);
// edit a mealplan
app.put("/mealplans/:id", mealplans.update);
// delete a mealplan
app.delete("/mealplans/:id", mealplans.delete);
// get all recipes of a mealplan
app.get("/mealplans/:id/recipesID",);

// get a shopping list
app.get("/shoppinglist/get/:userid", shoppinglist.get);

// create a user

app.post("/user", async (req, res) => {
    console.log(req)
    console.log(req.body)
    try {
        console.log(req)
        const { googleid, user_email, first_name, last_name, image_url } = req.body;
        const newUser = await pool.query(
            "INSERT INTO public.user_table (googleid, user_email, first_name, last_name, image_url) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [googleid, user_email, first_name, last_name, image_url]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//get a user
app.get("/user/:id", user.get);
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});
