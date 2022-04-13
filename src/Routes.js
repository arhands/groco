import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Landing from "./components/Landing/Landing";
import Recipes from "./components/Recipes/Recipes";
import Profile from "./components/Profile/Profile";
import ViewRecipe from "./components/ViewRecipe/ViewRecipe";
import MealPlans from "./components/MealPlans/MealPlans";
import EditMealPlan from "./components/EditMealPlan/EditMealPlan";
import Shopping from "./components/Shopping/Shopping";
import ShoppingRouteDisplay from "./components/ShoppingRouteDisplay/ShoppingRouteDisplay";
// import ViewMealPlan from "./components/ViewMealPlan/ViewMealPlan";
import Grocery from "./components/Grocery/Grocery";
import FavList from "./components/fav_list/fav_list";

export default function Routes() {

    return (
        <Switch>
            <Route exact path="/mealplans">
                <MealPlans />
            </Route>
            <Route exact path="/editmealplan">
                <EditMealPlan />
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
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route exact path="/shopping">
                <Shopping />
            </Route>
            <Route exact path="/grocery">
                <Grocery />
            </Route>
            <Route exact path="/shoppingroute">
                <ShoppingRouteDisplay />
            </Route>
            <Route exact path="/favorite_list">
                <FavList/>
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
