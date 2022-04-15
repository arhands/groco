const express = require("express");
const app = express();
const cors = require("cors");
const mealplans = require("./mealplans/mealplans");
const shoppinglist = require("./shoppinglist/shoppinglist");
const grocery = require("./grocery/grocery");
const user = require("./user/user")
const recipes = require("./recipes/recipes")
const shoppingAlgorithm = require("./shoppingsystem/shoppingsystem")
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
// get all mealplan of a user
app.get("/mealplans/:user_id", mealplans.getAll);
// get a all recipes of a mealplan
app.get("/mealplanRecipes/:mealplan_id", mealplans.getRecipes);
// delete a recipe of a mealplan
app.delete("/mealplanRecipes/:mealplan_id/:recipe_id", mealplans.deleteRecipe);
// edit a mealplan
app.put("/mealplans/:id", mealplans.update);
// delete a mealplan
app.delete("/mealplans/:id", mealplans.delete);
// get all recipes in database
app.get("/recipes", recipes.getAll);
// get recipe details
app.get("/recipes/details/:recipeId/:googleId", recipes.getDetail);
// post a new recipe
app.post("/recipes/post", recipes.post);
// get ingredient options
app.get("/recipes/ingredientoptions", recipes.getIngredientOptions);
// add recipe to shopping list ingredient options
app.get("/recipes/shoppinglist/:googleId/:recipeId", recipes.addToShoppingList);
// add recipe to shopping list ingredient options
app.get("/recipes/delete/:googleId/:recipeId", recipes.deleteRecipe);
// update recipe
app.post("/recipes/update", recipes.update);

// Shopping Route Algorithm
app.post("/route/ingredientoptions", recipes.getIngredientOptions);

// get a shopping list
app.post("/shoppinglistroute", shoppingAlgorithm.getShoppingRoute);

// ------ GROCERY QUERIES ------
// get all grocery items
app.get("/grocery", grocery.getGrocery);

// get all brands
app.get("/grocery/brand", grocery.getBrand);

// get all measurements
app.get("/grocery/meas", grocery.getMeas);

// add grocery item to list
app.post("/grocery/add_item/:googleID", grocery.addItem);


// create a user

app.post("/user", async (req, res) => {
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


