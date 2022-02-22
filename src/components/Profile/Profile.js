import React, { useState } from "react";
import logo from './default-profile-pic.png';
import './Profile.css'
import { useAuth } from "../../auth";

function Profile() {
    const { userProfile } = useAuth();
    return (
        <body>
            <div id="profile-page" class="div-container">
                <img id="profile-pic" src={userProfile?.imageUrl ? userProfile?.imageUrl : logo} class="profilePic"></img>
            </div>
            <div id="profile-names" class="div-container">
                <div id="first-name" class="div-child" style={{ fontSize: 45 }}> {userProfile?.givenName ?? ""} </div>
                <div id="last-name" class="div-child" style={{ fontSize: 45 }}> {userProfile?.familyName ?? ""} </div>
            </div>
            <div id="profile-username" class="div-container">
                <div id="username" class="div-child" style={{ fontSize: 20 }}> {userProfile?.email ?? ""} </div>
            </div>
        </body>
    );
}

export default Profile