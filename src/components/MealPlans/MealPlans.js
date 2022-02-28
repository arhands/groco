import { Link } from 'react-router-dom';
import "./MealPlans.css";
import { Fragment, useEffect, useState } from 'react';
import AddMealPlan from '../AddMealPlan/AddMealPlan';
import EditMealPlan from '../EditMealPlan/EditMealPlan';
import ViewMealPlan from '../ViewMealPlan/ViewMealPlan';



const MealPlans = () => {
    const api = "http://localhost:3001/mealplans";
    const [mealPlans, setMealPlans] = useState([]);
    // Delete mealplan function
    const deleteMealPlan = async (id)=>{
        try{
            const deleteTodo = await fetch(`https://61f6f4c72e1d7e0017fd6fa4.mockapi.io/mealplan/${id}`,{
                method:"DELETE"
            });
            setMealPlans(mealPlans.filter(mealPlan => mealPlan.mealplan_id!==id));
        }catch(err){
            console.err(err.message);
        }
    };

    // Fetch data from API
    const getMealPlans = async ()=>{
        try{
            const response = await fetch(api)
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
            {/*<thead>
                <tr>
                    <th>Mealplan</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>*/}
                <tbody>
                    {mealPlans.map(mealPlan =>(
                        <tr key={mealPlan.mealplan_id}>
                            <td>{mealPlan.name}</td>
                            <td>  
                                <ViewMealPlan mealplan={mealPlan}/>
                            </td>
                            <td>  
                                <EditMealPlan mealplan={mealPlan}/>
                            </td>
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
