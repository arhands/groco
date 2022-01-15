import { Link } from 'react-router-dom';
import "./MealPlans.css";
import { useEffect, useState } from 'react';
import axios from 'axios'
import Button from '../Button/Button';



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
            <div className='header'>
                <p> MEAL PLANS </p>
            </div>
            <div className='body' >
                 <p> {mealPlans.map(function(plan){
                    return <ul><Link to="/singleplan">{plan.name}</Link></ul>})}
                 </p>
            </div>
            <div className='addMealPlan'>
                <Button  text='Add'/>
            </div>
           
        </div>
        )
    }
    return (
        <div>Data not found</div>
    )


    
}

export default MealPlans
