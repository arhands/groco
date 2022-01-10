import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './Landing.css'
import { ListGroup } from "react-bootstrap";

function Landing() {

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <div className="Landing d-flex justify-content-center">
            <ListGroup>
                <Button>Profile</Button>
                <Button>Recipes</Button>
                <Button>Groceries</Button>
                <Button>Shopping List</Button>
                <Button>Meal Plans</Button>
            </ListGroup>
        </div>
    )
}

export default Landing
