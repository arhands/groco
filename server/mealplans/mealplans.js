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
async function getAllMealPlansOfUser(req, res) {
    try {
        const { user_id } = req.params;
        const allMealPlans = await pool.query("SELECT * FROM public.meal_plan_table WHERE user_id =$1",[user_id]);
        res.json(allMealPlans.rows);
    } catch (err) {
        console.log(err.message);
    }
}
/*
async function getMealPlan(req, res) {
    try {
        const {mealplan_id} = req.params;
        const todo = await pool.query("SELECT meal_plan_id,mpt.name AS meal_plan_name,recipe_id,rt.name AS recipe_name FROM public.meal_plan_table mpt JOIN public.meal_plan_recipe_table mprt ON mpt.id = mprt.meal_plan_id JOIN public.recipe_table rt ON mprt.recipe_id = rt.id WHERE id =$1", [mealplan_id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}*/
async function updateMealPlan(req, res){
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateTodo = await pool.query("UPDATE public.meal_plan_table SET name = $1 WHERE id = $2", [name, id]);
        res.json("Mealplan is updated");
    } catch (err) {
        console.log(err.message);
    }
}

async function delMealPlan (req, res) {
    try {
        const { id } = req.params;
        const deleteMealplan = await pool.query("DELETE FROM public.meal_plan_table WHERE id = $1", [id]);
        res.json("Mealplan is deleted");
    } catch (err) {
        console.log(err.message);
    }
}

async function deleteRecipeofMealplan (req, res) {
    try {
        const {mealplan_id,recipe_id } = req.params;
        const deleteRecipe = await pool.query("DELETE FROM public.meal_plan_recipe_table WHERE meal_plan_id = $1 AND recipe_id =$2", [mealplan_id,recipe_id]);
        res.json("recipe is deleted");

    } catch (err) {
        console.log(err.message);
    }
}
async function getMealPlanRecipes (req, res){
    try {
        const {mealplan_id } = req.params;
        const allRecipes = await pool.query("SELECT meal_plan_id, recipe_id, name FROM public.meal_plan_recipe_table me JOIN public.recipe_table re ON me.recipe_id = re.id WHERE meal_plan_id = $1",[mealplan_id]);
        res.json(allRecipes.rows);
    } catch (err) {
        console.log(err.message);
    }
}


module.exports = {
    create: createMealPlan,
    getAll: getAllMealPlansOfUser,
    update: updateMealPlan,
    delete: delMealPlan,
    getRecipes: getMealPlanRecipes,
    deleteRecipe: deleteRecipeofMealplan,
};