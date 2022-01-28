import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Signup from "./components/Signup/Signup";
import Landing from "./components/Landing/Landing";
import Recipes from "./components/Recipes/Recipes";
import ViewRecipe from "./components/ViewRecipe/ViewRecipe";
import MealPlans from "./components/MealPlans/MealPlans";
import SinglePlan from "./components/SinglePlan/SinglePlan";
import EditMealPlan from "./components/EditMealPlan/EditMealPlan";

export default function Routes() {
    
    return (
        <Switch>
            <Route exact path="/mealplans">
                <MealPlans />
            </Route>
            <Route exact path="/singleplan">
                <SinglePlan />
            </Route>
            <Route exact path="/editmealplan">
                <EditMealPlan />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/landing">
                <Landing />
            </Route>
            <Route exact path="/recipes">
                <Recipes />
            </Route>
            <Route exact path="/recipedetails">
                <ViewRecipe />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
