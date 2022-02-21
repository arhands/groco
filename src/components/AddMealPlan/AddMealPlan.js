import React from 'react';
import axios from 'axios';
import {Fragment, useState} from 'react';
import "./AddMealPlan.css"



const AddMealPlan = () => {
    const api = "http://localhost:3001/mealplans";
    const [name, setName] = useState("");
    const [user_id, setUserId] = useState(1);
    const onSubmitForm = async(e) =>{
        e.preventDefault();
        if (!name)
        {
            alert('Please add meal plan name')
            return
        }
        else{
            try{
                setUserId(4);
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
