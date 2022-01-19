import { Link } from 'react-router-dom';
import "./SinglePlan.css";
import { useEffect, useState } from 'react';
import axios from 'axios'
import MealPlans from '../MealPlans/MealPlans';

const SinglePlan = () => {
    const url= `https://61df114a0f3bdb00179348ba.mockapi.io/MealPlans/1/SinglePlan`
    const [singlePlan, setSinglePlan] = useState(null);
 
    useEffect(() => {
        axios.get(url)
            .then(response =>{
                setSinglePlan(response.data)
            })
    },[url])

    if(singlePlan){
        return (
            <div >
            <h3> {singlePlan.map(function(recipe){
                    return <ul><li><Link to="/recipe">{recipe.name}</Link></li></ul>})}
            </h3>
            
        </div>
        )
    }
    return (
        <div>Data not found</div>
    )

}

export default SinglePlan
