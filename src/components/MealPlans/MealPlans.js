import { Link } from 'react-router-dom';
import "./MealPlans.css";
import { useEffect, useState } from 'react';
import axios from 'axios'


const MealPlans = () => {
    const url= `https://61df114a0f3bdb00179348ba.mockapi.io/MealPlans`
    const [mealPlans, setMealPlans] = useState(null);
  // useEffect take 2 arguments: (arrow) function to run & changable variable to update
    useEffect(() => {
        axios.get(url)
            .then(response =>{
                setMealPlans(response.data)
            })
    },[url])

    if(mealPlans){
        return (
            <div>
            <p className='header'> MEAL PLANS </p>
            <h3> {mealPlans.map(function(plan){
                    return <ul><li><Link to="/singleplan">{plan.name}</Link></li></ul>})}
            </h3>

        </div>
        )
    }
    return (
        <div>Data not found</div>
    )


    
}

export default MealPlans
