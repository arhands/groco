import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './ViewRecipe.css'
import DataTable from 'react-data-table-component';

function ViewRecipe() {
    const location = useLocation()
    const { id, RecipeName } = location.data
    let columns = [
        { name: "Item",         selector: row => row.name },
        { name: "Amount",       selector: row => row.quantity},
        { name: "Measurement",  selector: row => row.measurement_type},
        { name: "✓",            selector: row => row.cb},
    ];
    // will be replaced with DB query.
    let instructions = "ERROR"
    let ingredients = []
    switch(id)
    {
        case 337:
            instructions = "Place the water into a pot and cook at medium for 20 minutes then serve.";
            ingredients = [
                { name: "Water", quantity: "1", measurement_type: "Cups" },
            ];
            break
        case 561:
            instructions = "Get two slices of bread and a pickle, mix them together, and enjoy.";
            ingredients = [
                { name: "Bread", quantity: "2", measurement_type: "Slices" },
                { name: "Pickle", quantity: "1", measurement_type: "N/A" },
            ];
            break
        case 849:
            instructions = "Fetch one bread from the store and throw an egg on it!";
            ingredients = [
                { name: "Bread", quantity: "1", measurement_type: "Loaf" },
                { name: "Egg", quantity: "1", measurement_type: "N/A" },
            ];
            break
        case 123:
            instructions = "Buy rice, eat it, then rethink your life because you just ate raw rice.";
            ingredients = [
                { name: "Rice", quantity: "2.3", measurement_type: "Cups" },
            ];
            break
        default:
            console.error("id = '" + toString(id) + "' is invalid")
            break
    }
    //
    function CloseMenu()
    {

    }
    let canEdit = false
    //
    for(let i = 0; i < ingredients.length; i++)
        ingredients[i].cb = (<input type="checkbox" checked/>)
    return (
        <div className="ViewRecipe">
            <h1 className="mb-3">
                {RecipeName}
            </h1>
            <h4 className="mb-3">
                Instructions
            </h4>
            <div className="col-2 font-weight-normal">
                {instructions}
            </div>
            <h4 className="mb-3">
                Ingredients
            </h4>
            <DataTable columns={columns} data={ingredients}/>
            <div className="bit-group" role="group">
                <Link to="/recipes">
                    <button type="button" className="btn btn-secondary">Exit</button>
                </Link>
                <button type="button" className="btn btn-secondary" disabled={canEdit}>Edit</button>
                <Link to="/recipes">
                    <button type="button" className="btn btn-primary">Add</button>
                </Link>
            </div>
        </div>
    )
}

export default ViewRecipe
