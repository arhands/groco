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
                <Button style={{ backgroundColor: '#f14b2c' }} block size="lg" >Groceries</Button>
                <Button style={{ backgroundColor: '#f14b2c' }} block size="lg" >Shopping List</Button>
                <Button style={{ backgroundColor: '#f14b2c' }} block size="lg" >Meal Plans</Button>
            </ListGroup>
        </div>
    )
}

export default Landing
