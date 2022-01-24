import { Link } from 'react-router-dom';
import "./MealPlans.css";
import { useEffect, useState } from 'react';
import axios from 'axios'
import Button from '../Button/Button';
import MealPlanHeader from '../MealPlanHeader/MealPlanHeader';
import AddMealPlan from '../AddMealPlan/AddMealPlan';



const MealPlans = () => {
    const url= `https://61df114a0f3bdb00179348ba.mockapi.io/MealPlans`
    const [mealPlans, setMealPlans] = useState(null);
    const [showAddNewPlan, setShowAddNewPlan] = useState(true);
    
  // useEffect take 2 arguments: (arrow) function to run & changable variable to update
    useEffect(() => {
        axios.get(url)
            .then(response =>{
                setMealPlans(response.data)
            })
    },[url])

  // Add mealplan
  const addMealPlan = (planName) => {
      const id = Math.floor(Math.random()*10000)+1
      const newPlan = {id, ...planName}
      setMealPlans([...mealPlans, newPlan])
      //console.log(newPlan)

  }



    if(mealPlans){
        return (
        <div>
            <div className='header'>
                <p> MEAL PLANS </p>
            </div>
            <div className='body' >
                 <div> {mealPlans.map(function(plan){
                    return <ul key={plan.id}><Link to="/singleplan"><MealPlanHeader title={plan.name}/></Link></ul>})}
                 </div>
            </div>
            <div className='addMealPlan'>
                <Button onClick={()=> setShowAddNewPlan(!showAddNewPlan)}
                color='#fb6500' text='Add New Plan'/>
            </div>
            {showAddNewPlan && <AddMealPlan onAdd={addMealPlan}/>}
        </div>
        )
    }
    return (
        <div>Data not found</div>
    )


    
}

export default MealPlans
