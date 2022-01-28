import { Link } from 'react-router-dom';
import "./MealPlans.css";
import { Fragment, useEffect, useState } from 'react';
import AddMealPlan from '../AddMealPlan/AddMealPlan';
import EditMealPlan from '../EditMealPlan/EditMealPlan';


const MealPlans = () => {
    const [mealPlans, setMealPlans] = useState([]);
    // Delete mealplan function
    const deleteMealPlan = async (id)=>{
        try{
            const deleteTodo = await fetch(`http://localhost:5000/mealplans/${id}`,{
                method:"DELETE"
            });
            setMealPlans(mealPlans.filter(mealPlan => mealPlan.mealplan_id!=id));

        }catch(err){
            console.err(err.message);
        }

    };

    // Fetch data from API
    const getMealPlans = async ()=>{
        try{
            const response = await fetch("http://localhost:5000/mealplans")
            const jsonData = await response.json();
            console.log(jsonData);
            setMealPlans(jsonData);
        }catch(err){
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getMealPlans();
    },[]);
 
  return (
    <Fragment>
        <AddMealPlan/>
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Mealplan</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
                <tbody>
                    {/* 
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>*/}
                    {mealPlans.map(mealPlan =>(
                        <tr key={mealPlan.mealplan_id}>
                            <td>{mealPlan.name}</td>
                            <td><EditMealPlan mealPlan={mealPlan}/></td>
                            <td>
                                <button className='btn btn-danger' 
                                onClick={()=> deleteMealPlan(mealPlan.mealplan_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
    </Fragment>
  )};


export default MealPlans
