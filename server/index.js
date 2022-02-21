/*const express = require('express')
const app = express()
const port = 3001

const db = require('./db')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
function test(req, res)
{
    db.getUserEmails()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
}
app.get('/test', test)
app.post('/test', test)
app.listen(port, () => console.log("App running on port ${port}"))
*/


const express = require("express");
const app = express();
const cors = require ("cors");
const pool = require("./db");
const port = 3001

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
// need to create database and table using psql first
app.post("/mealplans",async(req,res) =>{
    try{
        const{user_id, name} = req.body;
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
        const allMealPlans = await pool.query("SELECT * FROM public.\"testMealplan\"");
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

app.listen(port, () =>{
  console.log(`Server started at port ${port}`)
});
