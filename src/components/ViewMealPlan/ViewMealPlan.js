import React from 'react'
import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewMealPlan = ({mealplan}) => {
    const [showRecipes, setShowRecipes] =useState(false)
    const api = process.env.REACT_APP_BACKEND_API
    const [recipes, setRecipes] = useState([]);
    const getRecipesOfMealplan = async () => {
        try {
            const response = await fetch(`http://localhost:3001/mealplanRecipes/${mealplan.id}`)
            const jsonData = await response.json();
            console.log(jsonData);
            setRecipes(jsonData);

        } catch (err) {
            console.error(err.message);
        }

    };


    useEffect(() => {
        getRecipesOfMealplan();
    }, []);

    

  return (
    <div>
        <button className='btn btn-primary' onClick={()=>setShowRecipes(!showRecipes)}>View</button>
        <div>
            { showRecipes ? 
            <table className="table mt-5 text-center">
                <tbody>
                    {recipes.map(each => (
                        <tr key={each.recipe_id}>
                            <td>{each.name}</td>
                            <td>
                            <Link
                                to={{
                                    pathname: "/recipedetails",
                                    data: { id: each.recipe_id, RecipeName: each.name }
                                }}>
                                    Details
                                </Link>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>  :null
            }  
        </div>

    </div>
  )
};

export default ViewMealPlan