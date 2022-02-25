import React from 'react'
import { Fragment, useState, useEffect } from "react"

const ViewMealPlan = ({id}) => {
    //const [recipesID, setRecipesID] = useState([""]);
    var recipesID =[];
    const [mealPlanRecipes, setMealPlanRecipes] = useState([]);
    const getRecepiesID = async ()=>{
        try{
            const response = await fetch(`http://localhost:3001/mealplans/${id}/recipesID`)
            const jsonData = await response.json();
            console.log(jsonData);
            recipesID = jsonData;
            console.log(recipesID[0]);
            
        }catch(err){
            console.error(err.message);
        }
        
    };

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
        getRecepiesID();
    },[]);

    /*useEffect(()=>{
        getMealPlanRecipes();
    },[]);*/

    
  return (
      <Fragment>
                <div>{recipesID.map((each)=>{
                    <li>{each.recipe_id}</li>
                })}</div>
                <div>this is recipe</div>
              
      </Fragment>
    
  )
}

export default ViewMealPlan