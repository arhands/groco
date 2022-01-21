import React, { useState } from "react";
import logo from './default-profile-pic.png';
import './Profile.css'
import { ListGroup } from "react-bootstrap";

function Profile() {

    return (
        <body>
            <div id="profile-page" class="div-container">
                <img id="profile-pic" class="profilePic"></img>
            </div>
            <div id="profile-names" class="div-container">
                <div id="first-name" class="div-child" style={{fontSize: 45}}> John </div> 
                <div id="last-name" class="div-child" style={{fontSize: 45}}> Doe </div> 
            </div>
            <div id="profile-username" class="div-container">
                <div id="username" class="div-child" style={{fontSize: 20}}> @darth_baker </div>
            </div>
        </body>
    );
}

export default Profile