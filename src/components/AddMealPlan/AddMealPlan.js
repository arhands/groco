import React from 'react';
import axios from 'axios';
import {Fragment, useState, useEffect} from 'react';
import "./AddMealPlan.css"



const AddMealPlan = () => {

    const api = process.env.REACT_APP_BACKEND_API + "/mealplans";
    const [name, setName] = useState("");
    const user_id = localStorage.getItem('userId');
    const onSubmitForm = async(e) =>{
        e.preventDefault();
        if (!name)
        {
            alert('Please add meal plan name')
            return
        }
        else{
            try{
                const body = {user_id, name};
                console.log(body);
                axios.post(api, body
                ).then(response => {
                    console.log(response);
                    window.location = "/mealplans";
                }); 
            }catch(err){
                console.error(err.message);
            }
            
        }

    }
  return (
    <Fragment>
        <h1 className='text-center mt-5'>Meal Plans</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input type='text' placeholder='New plan name' className="form-control" value={name}
            onChange={e => setName(e.target.value)}/>
            <button className='btn btn-success'>Add</button>
        </form>
    
    </Fragment>
  )
};

export default AddMealPlan
