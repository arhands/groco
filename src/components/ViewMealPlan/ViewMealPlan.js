import React from 'react'
import { Fragment, useState, useEffect } from "react"

const ViewMealPlan = ({mealplan}) => {
    const [recipesID, setRecipesID] = useState([]);
    const [mealPlanRecipes, setMealPlanRecipes] = useState([]);
    const getRecepiesID = async ()=>{
        try{
            const response = await fetch(`http://localhost:3001/mealplans/${mealplan.id}/recipesID`)
            const jsonData = await response.json();
            console.log(jsonData);
            jsonData.map(each =>{setRecipesID(each)});
            console.log(recipesID);
            
        }catch(err){
            console.error(err.message);
        }
        
    };

    /*

    const getMealPlanRecipes = async ()=>{
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
          
          <div>{recipesID.map(each => (
            <li>
                {each}
            </li>
        ))}
          
          </div>
          <div>This is recipe</div>
      </Fragment>
    
  )
}

export default ViewMealPlan