import React from 'react'
import { Fragment, useState, useEffect } from "react"
import { Link } from 'react-router-dom';


const ViewMealPlan = ({mealplan}) => {
    const [recipesID, setRecipesID] = useState([]);
    //const [mealPlanRecipes, setMealPlanRecipes] = useState([]);
    const getRecepiesID = async ()=>{
        try{
            const response = await fetch(`http://localhost:3001/mealplans/${mealplan.id}/recipesID`)
            const jsonData = await response.json();
            console.log(jsonData);
            setRecipesID(jsonData)
        }catch(err){
            console.error(err.message);
        }
        
    };

 

    /*function setRecipes(jsonData){
        setRecipesID(jsonData)
    }*/
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
        
        </div>
}

export default ViewMealPlan