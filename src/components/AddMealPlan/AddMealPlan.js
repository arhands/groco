import React from 'react';
import {Fragment, useState} from 'react';
import "./AddMealPlan.css"

const AddMealPlan = () => {
    const [mealPlanName, setMealPlanName] = useState("");
    //const [userId, setUserId] = useState(1);
    const onSubmitForm = async(e) =>{
        e.preventDefault();
        try{
            const body = {mealPlanName};
            const response = await fetch("http://localhost:5000/mealplans",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        }catch(err){
            console.error(err.message);
        }
       
        setMealPlanName("");

    }
  return (
    <Fragment>
        <h1 className='text-center mt-5'>Meal Plans</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input type='text' className="form-control" value={mealPlanName}
            onChange={e => setMealPlanName(e.target.value)}/>
            <button className='btn btn-success'>Add</button>
        </form>
    
    </Fragment>
  )
};

export default AddMealPlan
