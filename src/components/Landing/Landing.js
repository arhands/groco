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
                <Link to="/profile">
                    <Button style={{ backgroundColor: '#f14b2c' }} block size="lg" >Profile</Button>
                </Link>
                <Link to="/recipes">
                    <Button style={{ backgroundColor: '#f14b2c' }} block size="lg" >Recipes</Button>
                </Link>
                <Link to="/grocery">
                    <Button style={{ backgroundColor: '#f14b2c' }} block size="lg" >Grocery</Button>
                </Link>
                <Link to="/shopping">
                    <Button style={{ backgroundColor: '#f14b2c' }} block size="lg" >Shopping List</Button>
                </Link>
                <Link to="/mealplans">
                    <Button style={{ backgroundColor: '#f14b2c' }} block size="lg" >Meal Plans</Button>
                </Link>
            </ListGroup>
        </div>
    )
}

export default Landing
