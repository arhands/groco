import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './ViewRecipe.css'
import DataTable from 'react-data-table-component';
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

function ViewRecipe() {
    const location = useLocation()
    const { id, RecipeName } = location.data
    console.log(JSON.stringify(location))
    let columns = [
        { name: "Item",         selector: row => row.name },
        { name: "Amount",       selector: row => row.quantity},
        { name: "Measurement",  selector: row => row.measurement_type},
        { name: "✓",            selector: row => row.cb},
    ];
    // will be replaced with DB query.
    let instructions = "ERROR"
    let ingredients = []
    let isAuthor = true
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
    function GenerateMealPlanSelection()
    {
        return (<></>)
        let mealPlans = [
            {name: "3 days plan",   id: "1"},
            {name: "1 week plan",   id: "2"},
            {name: "Vegetarian",    id: "3"},
            {name: "Thanksgiving",  id: "4"},
            {name: "Weekend BBQ",   id: "5"}
        ];
        function AddToMealPlan(id)
        {
            //console.log("Adding recipe to meal plan " + toString(id) + ".")
        }
        return (
            <DropdownButton as={ButtonGroup} title="+ Meal Plan">
                {mealPlans.map(
                    p => (<Dropdown.Item as="button" onClick={AddToMealPlan(p.id)} eventKey={p.id}>{p.name}</Dropdown.Item>))
                }
            </DropdownButton>
        )
    }
    //
    function CloseMenu()
    {

    }
    let canEdit = false
    //
    for(let i = 0; i < ingredients.length; i++)
    {
        ingredients[i].isIncluded = true
        ingredients[i].cb = (<input type="checkbox" defaultChecked onChange={(e) => ingredients[i].isIncluded = e.target.value}/>)
    }
    return (
        <form>
            <label>
                Name:
                <input type="text" value={RecipeName} onChange={(e) => RecipeName=e.target.value} disabled/>
            </label>
            <br/>
            <label>
                Instructions:
                <textarea type="text" value={RecipeName} onChange={(e) => instructions=e.target.value} disabled/>
            </label>
            <br/>
            <label>
                Ingredients:
                <br/>
                <DataTable columns={columns} data={ingredients}/>
            </label>
            <br/>
            {
                isAuthor? 
                (
                    <ButtonGroup>              
                        <Button variant="Secondary">Delete</Button>
                        <Button variant="Secondary">Edit</Button>
                        <Button variant="Secondary">Close</Button>
                        {GenerateMealPlanSelection()}
                        <Button variant="Primary">+ List</Button>
                    </ButtonGroup>
                ) :
                (
                    <ButtonGroup>              
                        <Button variant="Secondary">Close</Button>
                        {GenerateMealPlanSelection()}
                        <Button variant="Primary">+ List</Button>
                    </ButtonGroup>
                )
            }
        </form>
    );
}

export default ViewRecipe
