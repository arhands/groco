import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './Recipes.css'
import DataTable from 'react-data-table-component';
import { Modal } from "react-bootstrap";
import $, { ajax } from 'jquery';

function Recipes() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function ModalShowInstructions(id)
    {
        // will be replaced with DB query.
        let data = "ERROR"
        switch(id)
        {
            case 337:
                data = "Place the water into a pot and cook at medium for 20 minutes then serve.";
                break
            case 561:
                data = "Get two slices of bread and a pickle, mix them together, and enjoy.";
                break
            case 849:
                data = "Fetch one bread from the store and throw a pickle on it!";
                break
            case 123:
                data = "Buy rice, eat it, then rethink your life because you just ate raw rice.";
                break
            default:
                console.error("id = '" + toString(id) + "' is invalid")
                break
        }
        //
        ReactDOM.render(
            <h1> 
                {data}
            </h1>
        ,document.getElementById("ModalBody"))
    }
    function GenerateRecipeModal()
    {
        function ToggleIngredients()
        {
            let id = $("div[className='Recipes']").attr('id')
            let viewButton = $("#ModalViewIngredientsButton")
            let setToIngredients = viewButton.html() === "View Ingredients"
            if(setToIngredients)
            {
                viewButton.html("View Instructions")
                
            }
            else
            {
                viewButton.html("View Ingredients")
                ModalShowInstructions(id)
            }
        }
        return (
            <Modal show={show} onHide={handleClose} id="Modal">
                {/* We store the id for the current recipe in the header.*/}
                <Modal.Header>
                    <Modal.Title id="ModalTitle">
                        Recipe Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body id="ModalBody">
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="Secondary" id="ModalViewIngredientsButton" onClick={ToggleIngredients}>
                        View Ingredients
                    </Button>
                    <Button variant="Secondary" disabled>
                        Edit
                    </Button>
                    <Button variant="Secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="Primary" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    function ShowRecipeDetails(data)
    {
        setShow(true,() => {
            $("div[className='Recipes']").attr("id",data.id);
            $("#ModalTitle").html(data.name);
            ModalShowInstructions(data.id)
        });
    }
    function AddRecipe(data)
    {

    }
    const columns = [
        {name: 'Name', selector: row => row.name},
        {name: 'Author', selector: row => row.creator},
        {name: 'Details', selector: row => row.details},
        {name: 'Add', selector: row => row.add},
    ];
    // raw data collected from server
    const RawData = [
        { creator: "Kyle",      name: "Water Soup",      id: 337},
        { creator: "Steve",     name: "Pickle Sandwich", id: 561},
        { creator: "Will",      name: "Egg on Bread",    id: 849},
        { creator: "Christine", name: "Rice",            id: 123}
    ];
    // converting data into something usable.
    const data = []
    for(let i = 0; i < RawData.length; i++)
    {
        data.push({
            id: i,
            creator: RawData[i].creator,
            name: RawData[i].name,
            details: (
                <Button onClick={() => ShowRecipeDetails(RawData[i])}>
                    Details
                </Button>
            ),
            add: (
                <Button onClick={() => AddRecipe(RawData[i])}>
                    Add
                </Button>
            )
        });
    }
    return (
        <div className="Recipes" id="-1">
            <DataTable columns={columns} data={data}/>
            {GenerateRecipeModal()}
        </div>
    )
}

export default Recipes
