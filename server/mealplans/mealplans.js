const pool = require("../db");

async function createMealPlan(req, res) {
    try {
        const { user_id, name } = req.body;
        const newMealPlan = await pool.query(
            "INSERT INTO public.meal_plan_table (user_id, name) VALUES($1, $2) RETURNING *",
            [user_id, name]
        );
        res.json(newMealPlan.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}
async function getAllMealPlans(req, res) {
    try {
        const allMealPlans = await pool.query("SELECT * FROM public.meal_plan_table");
        res.json(allMealPlans.rows);
    } catch (err) {
        console.log(err.message);
    }
}
async function getMealPlan(req, res) {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM public.meal_plan_table WHERE mealplan_id =$1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}
async function updateMealPlan(req, res){
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateTodo = await pool.query("UPDATE public.meal_plan_table SET name = $1 WHERE mealplan_id = $2", [name, id]);
        res.json("Mealplan is updated");
    } catch (err) {
        console.log(err.message);
    }
}

async function delMealPlan (req, res) {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM public.meal_plan_table WHERE id = $1", [id]);
        res.json("Mealplan is deleted");
    } catch (err) {
        console.log(err.message);
    }
}

async function getMealPlanRecipe (req, res){
    try {
        const { id } = req.params;
        const allRecipesID = await pool.query("SELECT recipe_id FROM public.meal_plan_recipe_table WHERE meal_plan_id = $1", [id]);
        //const allRecipesName = await pool.query("SELECT name FROM public.\"recipe_table\" WHERE id = $1",[each]);
        res.json(allRecipesID.rows);

    } catch (err) {
        console.log(err.message);
    }
}
module.exports = {
    create: createMealPlan,
    getAll: getAllMealPlans,
    get: getMealPlan,
    update: updateMealPlan,
    delete: delMealPlan,
    getRecipe: getMealPlanRecipe,
};