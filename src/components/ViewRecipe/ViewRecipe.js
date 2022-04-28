import React from "react";
import { useLocation } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './ViewRecipe.css'
import IngredientTable from './IngredientTable.js'
import { ButtonGroup, Dropdown, DropdownButton, FormLabel } from "react-bootstrap";

function ViewRecipe() {
    const location = useLocation()
    let { id, RecipeName } = location.data
    //const [newId, setId] = React.useState(id)
    //const [newName, setName] = React.useState(RecipeName)
    //const [instructions, setInstructions] = React.useState(null)
    //const [ingredients, setIngredients] = React.useState([])
    const [instructions, setInstructions] = React.useState(null)
    const [ingredients, setIngredients] = React.useState([])
    const [newId, setID] = React.useState(id)
    const [name, setName] = React.useState(RecipeName)
    const [getting_data, setGettingData] = React.useState(true)
    const [isAuthor, setIsAuthor] = React.useState(id === -1)
    const [mealPlans, setMealPlans] = React.useState([])
    const api = process.env.REACT_APP_BACKEND_API + "/recipes/";
    //const api = "http://localhost:3001/recipes/";
    if (id !== -1 && getting_data) {
        setGettingData(false)
        
        if (instructions == null) {
            (async () => {
                try {
                    const googleid = localStorage.getItem('googleId')
                    const response = await fetch(api + `details/${id}/${googleid}`)
                    let jsonData = await response.json()
                    console.log(32,jsonData)
                    setIngredients(jsonData.ingredients)
                    setInstructions(jsonData.instructions)
                    setMealPlans(jsonData.mealPlans)
                    setIsAuthor(jsonData.isAuthor)
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }
    function GenerateMealPlanSelection() {
        async function AddToMealPlan(p) {
            try {
                const googleid = localStorage.getItem('googleId')
                const response = await fetch(api + `addrecipetomealplan/${p}/${newId}/${googleid}`)
            } catch (err) {
                console.error(err);
            }
        }
        return (
            <DropdownButton as={ButtonGroup} title="+ Meal Plan">
                {mealPlans.length > 0? mealPlans.map(
                    p => (
                        <Link to={{ pathname: "/recipes" }} >
                            <Dropdown.Item as={Button} onClick={() => AddToMealPlan(p.id)} eventKey={p.id}>
                                {p.name}
                            </Dropdown.Item>
                        </Link>))
                : <p>None</p>}
            </DropdownButton>
        )
    }
    //
    function addRecipeToShoppingList()
    {
        (async () => {
            try {
                const googleid = localStorage.getItem('googleId')
                const response = await fetch(api + `shoppinglist/${googleid}/${newId}`)
                let jsonData = await response.json()
            } catch (err) {
                console.error(err);
            }
        })();
    }
    const [editMode, updateState] = React.useState(id === -1)
    function editModeToggle() {
        // checking if we need to save the recipe.
        if (editMode)// if this is true, then we are currently in edit mode and need to save the changes.
        {
            if (newId === -1) {
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
                                name: name
                            })
                        });
                        setID((await response.json()).recipeid)
                        console.log("got response")
                    } catch (err) {
                        console.error(err);
                    }
                })();
            }
            else
            {
                (async () => {
                    try {
                        const googleid = localStorage.getItem('googleId')
                        const response = await fetch(api + 'update', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                googleid: googleid,
                                recipe_id: newId,
                                ingredients: ingredients.map(s => ({
                                    ingredient_id: s.ingredient_id,
                                    quantity: s.quantity,
                                    measurement_type: s.measurement_id,
                                })),
                                instructions: instructions,
                                name: name
                            })
                        });
                    } catch (err) {
                        console.error(err);
                    }
                })();   
            }
        }
        updateState(!editMode)
    }
    async function deleteRecipe()
    {
        const googleid = localStorage.getItem('googleId')
        await fetch(`http://localhost:3001/recipes/delete/${googleid}/${newId}`)
    }
    return (
        <form>
            <label>
                Name:
                <input type="text" defaultValue={name} onChange={e => setName(e.target.value)} id="input-name" disabled={!editMode} />
            </label>
            <br />
            <Form.Label>
                Instructions:<br />
            </Form.Label>
            <Form.Control as="textarea" rows="8" defaultValue={instructions} onChange={e => setInstructions(e.target.value)} id="input-instructions" disabled={!editMode} />
            <br />
            <IngredientTable
                EditMode={editMode}
                Ingredients={ingredients}
                UpdateIngredientsCallback={newIng => setIngredients(newIng) }
            />
            <br />
            {
                isAuthor ?
                    (
                        <ButtonGroup>
                            <Link to={{ pathname: "/recipes" }} >
                                <Button variant="Secondary" onClick={deleteRecipe}>Delete</Button>
                            </Link>
                            <Button variant="Secondary" onClick={editModeToggle} id="editBtn">{editMode ? "Save" : "Edit"}</Button>
                            <Link to={{ pathname: "/recipes" }} >
                                <Button variant="Secondary">Close</Button>
                            </Link>
                            <Link to={{ pathname: "/recipes" }} >
                                <Button variant="Secondary" onClick={addRecipeToShoppingList}>Add Shopping List</Button>
                            </Link>
                            {id === -1 ? null : GenerateMealPlanSelection()}
                        </ButtonGroup>
                    ) :
                    (
                        <ButtonGroup>
                            <Link to={{ pathname: "/recipes" }} >
                                <Button variant="Secondary">Close</Button>
                            </Link>
                            <Link to={{ pathname: "/recipes" }} >
                                <Button variant="Secondary" onClick={addRecipeToShoppingList}>Add Shopping List</Button>
                            </Link>
                            {id === -1 ? null : GenerateMealPlanSelection()}
                        </ButtonGroup>
                    )
                    /*
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
                    */
            }
        </form>
    );
}

export default ViewRecipe
