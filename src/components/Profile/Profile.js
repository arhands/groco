import React, { useState } from "react";
import logo from './default-profile-pic.png';
import './Profile.css'
import { ListGroup } from "react-bootstrap";

function Profile() {

    return (
        <div id="profile-page" class="div-container">
            <img id="profile-pic" class="profilePic"></img>
        </div>
    );
}

export default Profile