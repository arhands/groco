import React from 'react';
import {useState} from 'react';
import "./AddMealPlan.css"

const AddMealPlan = ({onAdd}) => {
    const [name, setName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if(!name){
            alert('Please add the plan name')
            return
        }
        onAdd({name})
        setName('')
    }

    return (
        <form className='addMealPlan-form' onSubmit={onSubmit}>
            <div>
                <label>Name</label>
                <input size="80" type='text' placeholder='Add plan name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <input type='submit' value='Save' className='btn'/>
        </form>
    )
}

export default AddMealPlan
