const express = require("express");
const app = express();
const cors = require("cors");
const mealplans = require("./mealplans/mealplans");
const shoppinglist = require("./shoppinglist/shoppinglist");
const port = 3001

// middleware
app.use(cors());
app.use(express.json());

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
app.get("/shoppinglist/:id", shoppinglist.get);

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});
