const express = require("express");
const app = express();
const cors = require ("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
// need to create database and table using psql first
app.post("/mealplans",async(req,res) =>{
    try{
        const{user_id} = req.body;
        const {name} = req.body;
        const newMealPlan = await pool.query(
            "INSERT INTO mealplan (user_id, name) VALUES($1, $2) RETURNING *",
            [user_id, name]
        );
        res.json(newMealPlan.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})
// get all mealplan
app.get("/mealplans",async(req,res) =>{
    try{
        const allMealPlans = await pool.query("SELECT * FROM mealplan");
        res.json(allMealPlans.rows);
    }catch(err){
        console.log(err.message);
    }
});

// get a mealplan
app.get("/mealplans/:id",async(req,res) =>{
    try{
       const {id} = req.params;
       const todo =await pool.query("SELECT * FROM mealplan WHERE mealplan_id =$1",[id]);
       res.json(todo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
});

// edit a mealplan
app.put("/mealplans/:id",async(req,res) =>{
    try{
       const {id} = req.params;
       const {name} = req.body;
       const updateTodo =await pool.query("UPDATE mealplan SET name = $1 WHERE mealplan_id = $2",[name,id]);
       res.json("Mealplan is updated");
    }catch(err){
        console.log(err.message);
    }
});

// delete a mealplan
app.delete("/mealplans/:id",async(req,res) =>{
    try{
       const {id} = req.params;
       const deleteTodo =await pool.query("DELETE FROM mealplan WHERE mealplan_id = $1",[id]);
       res.json("Mealplan is deleted");
    }catch(err){
        console.log(err.message);
    }
});

app.listen(5000, () =>{
  console.log("Server started at port 5000")
});

