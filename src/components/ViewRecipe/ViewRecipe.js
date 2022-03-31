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
    //const [newId, setId] = React.useState(id)
    //const [newName, setName] = React.useState(RecipeName)
    //const [instructions, setInstructions] = React.useState(null)
    //const [ingredients, setIngredients] = React.useState([])
    const [{instructions, ingredients, newId}, setRecipe] = React.useState({instructions: null,ingredients: [],newId: id})
    const [isAuthor, setIsAuthor] = React.useState(id === -1)
    const api = "http://localhost:3001/recipes/";
    if (id !== -1) {
        if (instructions == null) {
            (async () => {
                try {
                    const response = await fetch(api + `details/${id}`)
                    let jsonData = await response.json()
                    setRecipe({instructions: jsonData.instructions,ingredients: jsonData.ingredients,newId: id})
                    console.log("ingredients updated.")
                    console.log(JSON.stringify(jsonData.ingredients))
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }
    function GenerateMealPlanSelection() {
        let mealPlans = [
            { name: "3 days plan", id: 1 },
            { name: "1 week plan", id: 2 },
            { name: "Vegetarian", id: 3 },
            { name: "Thanksgiving", id: 4 },
            { name: "Weekend BBQ", id: 5 }
        ];
        function AddToMealPlan(p) {
            console.log("Adding recipe to meal plan " + JSON.stringify(p) + ".")
            //console.log("Adding recipe to meal plan " + toString(p.id) + ".")
        }
        return (
            <DropdownButton as={ButtonGroup} title="+ Meal Plan">
                {mealPlans.map(
                    p => (
                        <Link to={{ pathname: "/recipes" }} >
                            <Dropdown.Item as={Button} onClick={() => AddToMealPlan(p)} eventKey={p.id}>
                                {p.name}
                            </Dropdown.Item>
                        </Link>))
                }
            </DropdownButton>
        )
    }
    //
    console.log("id === -1:", id === -1)
    const [editMode, updateState] = React.useState(id === -1)
    function editModeToggle()
    {
        // checking if we need to save the recipe.
        if(editMode)// if this is true, then we are currently in edit mode and need to save the changes.
        {
            if(newId === -1)
            {
                (async () => {
                    try {
                        const googleid = localStorage.getItem('googleId')
                        const response = await fetch(api + 'post', {
                            method: 'POST',
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                googleid: googleid,
                                ingredients: ingredients.map(s => ({
                                    ingredient_id: s.ingredient_id,
                                    quantity: s.quantity,
                                    measurement_type: s.measurement_id,
                                })), 
                                instructions: instructions, 
                                name: RecipeName
                            })
                        });
                        let jsonData = await response.json()
                        setRecipe({instructions: instructions,ingredients: ingredients, newId: jsonData.id})
                    } catch (err) {
                        console.error(err);
                    }
                })();
            }
        }
        updateState(!editMode)
    }
    return (
        <form>
            <label>
                Name:
                <input type="text" defaultValue={RecipeName} onChange={e => RecipeName = e.target.value} id="input-name" disabled={!editMode} />
            </label>
            <br />
            <Form.Label>
                Instructions:<br />
            </Form.Label>
            <Form.Control as="textarea" rows="8" defaultValue={instructions} onChange={e => setRecipe({instructions: e.target.value,ingredients: ingredients, newId: newId})} id="input-instructions" disabled={!editMode} />
            <br />
            <IngredientTable 
                EditMode={editMode} 
                Ingredients={ingredients}
                UpdateIngredientsCallback={newIng => {console.log(newId); setRecipe({instructions: instructions,ingredients: newIng, newId: newId})}}
            />
            <br />
            {
                isAuthor ?
                    (
                        <ButtonGroup>
                            <Button variant="Secondary">Delete</Button>
                            <Button variant="Secondary" onClick={editModeToggle} id="editBtn">{editMode ? "Save" : "Edit"}</Button>
                            <Link to={{ pathname: "/recipes" }} >
                                <Button variant="Secondary">Close</Button>
                            </Link>
                            {id === -1 ? null : GenerateMealPlanSelection()}
                            <Link to={{ pathname: "/recipes" }} >
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
