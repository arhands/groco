import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './ViewRecipe.css'
import IngredientTable from './IngredientTable.js'
import DataTable from 'react-data-table-component';
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import $ from 'jquery';

function ViewRecipe() {
    const location = useLocation()
    let { id, RecipeName } = location.data
    console.log(JSON.stringify(location))
    let columns = [
        { name: (<Form.Label>Item</Form.Label>),         selector: row => row.name },
        { name: (<Form.Label>Amount</Form.Label>),       selector: row => row.quantity },
        { name: (<Form.Label>Measurement</Form.Label>),  selector: row => row.measurement_type },
        { name: (<Form.Label>Include</Form.Label>),      selector: row => row.cb },
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
                { name: "Water", quantity: 1, measurement_type: "Cups" },
            ];
            break
        case 561:
            instructions = "Get two slices of bread and a pickle, mix them together, and enjoy.";
            ingredients = [
                { name: "Bread", quantity: 2, measurement_type: "Slices" },
                { name: "Pickle", quantity: 1, measurement_type: "N/A" },
            ];
            break
        case 849:
            instructions = "Fetch one bread from the store and throw an egg on it!";
            ingredients = [
                { name: "Bread", quantity: 1, measurement_type: "Loaf" },
                { name: "Egg", quantity: 1, measurement_type: "N/A" },
            ];
            break
        case 123:
            instructions = "Buy rice, eat it, then rethink your life because you just ate raw rice.";
            ingredients = [
                { name: "Rice", quantity: 2.3, measurement_type: "Cups" },
            ];
            break
        default:
            console.error("id = '" + toString(id) + "' is invalid")
            break
    }
    function GenerateMealPlanSelection()
    {
        let mealPlans = [
            {name: "3 days plan",   id: 1},
            {name: "1 week plan",   id: 2},
            {name: "Vegetarian",    id: 3},
            {name: "Thanksgiving",  id: 4},
            {name: "Weekend BBQ",   id: 5}
        ];
        function AddToMealPlan(p)
        {
            console.log("Adding recipe to meal plan " + JSON.stringify(p) + ".")
            //console.log("Adding recipe to meal plan " + toString(p.id) + ".")
        }
        return (
            <DropdownButton as={ButtonGroup} title="+ Meal Plan">
                {mealPlans.map(
                    p => (
                        <Link to={{ pathname: "/recipes"}} >
                            <Dropdown.Item as={Button} onClick={() => AddToMealPlan(p)} eventKey={p.id}>
                                {p.name}
                            </Dropdown.Item>
                        </Link>))
                }
            </DropdownButton>
        )
    }
    //
    let isInEditMode = false
    const [editMode, updateState] = React.useState(false)
    //const onClickEditBtn = () => setEditMode(!editMode)
    function onClickEditBtn()
    {
        isInEditMode = !isInEditMode
        updateState(isInEditMode)
        // still has old value for 'editMode'.
        if(editMode)
            for(let i = 0; i < ingredients.length; i++)
                $("#toggleBtn-" + i).html(ingredients[i].isIncluded? "Included" : "Excluded")
        else
        {
            let ing = $("#ingredients")
            ing.find(":button").html("Delete")
            ing.find(":input").prop("disabled",editMode)
        }
        
    }
    return (
        <form>
            <label>
                Name:
                <input type="text" defaultValue={RecipeName} onChange={e => RecipeName=e.target.value} id="input-name" disabled={!editMode}/>
            </label>
            <br/>
            <Form.Label>
                Instructions:<br/>
            </Form.Label>
            <Form.Control as="textarea" rows="8" defaultValue={instructions} onChange={e => instructions=e.target.value} id="input-instructions" disabled={!editMode}/>
            <br/>
            <IngredientTable EditMode={editMode} Ingredients={ingredients}/>
            <br/>
            {
                isAuthor? 
                (
                    <ButtonGroup>             
                        <Button variant="Secondary">Delete</Button>
                        <Button variant="Secondary" onClick={onClickEditBtn} id="editBtn">{editMode? "Save" : "Edit"}</Button>
                        <Link to={{ pathname: "/recipes"}} >
                            <Button variant="Secondary">Close</Button>
                        </Link>
                        {GenerateMealPlanSelection()}
                        <Link to={{ pathname: "/recipes"}} >
                            <Button variant="Secondary">+List</Button>
                        </Link>
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
