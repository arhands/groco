import React from 'react'

const MealPlanRecipes = ({recipesID}) =>{
  return (
    <div>
        This is printing or no?
        <ul>
    {recipesID?.map((each)=>{
        <li>{each.recipe_id}</li>
    })}
    </ul></div>
  )
}

export default MealPlanRecipes