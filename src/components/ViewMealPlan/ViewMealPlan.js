import React from 'react'
import { Fragment, useState, useEffect } from "react"
import MealPlanRecipes from './MealPlanRecipes';

const ViewMealPlan = ({id}) => {
    const [recipesID, setRecipesID] = useState([]);
    
    //const [mealPlanRecipes, setMealPlanRecipes] = useState([]);
    const getRecepiesID = async ()=>{
        try{
            const response = await fetch(`http://localhost:3001/mealplans/${id}/recipesID`)
            const jsonData = await response.json();
            console.log(jsonData);
            setRecipes(jsonData);
        }catch(err){
            console.error(err.message);
        }
        
    };
    function setRecipes(jsonData){
        setRecipesID(jsonData)
    }
    /*const getMealPlanRecipes = async ()=>{
        try{
            const response = await fetch(`http://localhost:3001/mealplans/${mealplan.id}`)
            const jsonData = await response.json();
            console.log(jsonData);
            setMealPlanRecipes(jsonData);
            
        }catch(err){
            console.error(err.message);
        }
        
    };*/
    useEffect(()=>{
    },[recipesID])
    useEffect(()=>{
        getRecepiesID();
    },[]);

    /*useEffect(()=>{
        getMealPlanRecipes();
    },[]);*/

    
  return <div>
                <div>
                    <MealPlanRecipes recipesID={recipesID}/>
                </div>
                <div>
                    {recipesID[0]?.recipe_id}
                </div>
                <div>this is recipe</div>
        </div>
}

export default ViewMealPlan