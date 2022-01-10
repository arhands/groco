import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './Recipes.css'
import DataTable from 'react-data-table-component';
import { Modal } from "react-bootstrap";
import $ from 'jquery';

function Recipes() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function GenerateRecipeModal()
    {
        function ToggleIngredients()
        {
            //let id = $(":Modal").attr("id")
            let viewButton = $("#ModalViewIngredientsButton")
            let setToIngredients = viewButton.html() === "View Ingredients"
            if(setToIngredients)
            {
                viewButton.html("View Instructions")
            }
            else
            {
                viewButton.html("View Ingredients")
            }
            
        }
        return (
            <Modal show={show} onHide={handleClose} id="Modal">
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
        $("#Modal").attr("id",data.id);
        $("#ModalTitle").html(data.name);
        setShow(true);
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
        <div className="Recipes">
            <DataTable columns={columns} data={data}/>
            {GenerateRecipeModal()}
        </div>
    )
}

export default Recipes
