import React, { useEffect, useState } from "react";
import logo from './default-profile-pic.png';
import './Profile.css'
import axios from "axios";

function Profile() {
    // const { userProfile } = useAuth();
    // const url = 'http://localhost:3001'
    const url = 'https://groco-backend.herokuapp.com'
    const [userProfile, setUserProfile] = useState();
    useEffect(async () => {
        await axios.get(url + '/user/' + localStorage.getItem('googleId')).then(response => {
            setUserProfile(response.data);
        })
    }, [])

    return (
        <body>
            <div id="profile-page" class="div-container">
                <img id="profile-pic" src={userProfile?.image_url ?? logo} class="profilePic"></img>
            </div>
            <div id="profile-names" class="div-container">
                <div id="first-name" class="div-child" style={{ fontSize: 45 }}> {userProfile?.first_name ?? ""} </div>
                <div id="last-name" class="div-child" style={{ fontSize: 45 }}> {userProfile?.last_name ?? ""} </div>
            </div>
            <div id="profile-username" class="div-container">
                <div id="username" class="div-child" style={{ fontSize: 20 }}> {userProfile?.user_email ?? ""} </div>
            </div>
        </body>
    );
}

export default Profile