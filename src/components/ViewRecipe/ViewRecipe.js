import React from "react";
import { useLocation } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './ViewRecipe.css'
import IngredientTable from './IngredientTable.js'
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

function ViewRecipe() {
    const location = useLocation()
    let { id, RecipeName } = location.data
    let instructions = "ERROR"
    let ingredients = []
    let isAuthor = true
    if(id === -1)// new recipe
    {
        instructions = ""
    }
    else
    {
        
    }
    // will be replaced with DB query.

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
    console.log("id === -1:",id === -1)
    const [editMode, updateState] = React.useState(id === -1)
    let editModeToggle = () => updateState(!editMode)
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
                        <Button variant="Secondary" onClick={editModeToggle} id="editBtn">{editMode? "Save" : "Edit"}</Button>
                        <Link to={{ pathname: "/recipes"}} >
                            <Button variant="Secondary">Close</Button>
                        </Link>
                        {id===-1? null : GenerateMealPlanSelection()}
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
