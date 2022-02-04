import React, { useState } from "react";
import GoogleLogin from 'react-google-login'
import { useSnackbar } from "notistack";
import { useAuth } from "../../auth";
import "./Login.css";
import { useHistory } from "react-router-dom";

export default function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useAuth();
    let history = useHistory();
    const LoginSuccess = (response) => {
        console.log(response)
        login(response);
        history.push("/landing")
    }
    const LoginFailure = (response) => {
        if (response?.error === 'popup_closed_by_user')
            enqueueSnackbar('Popup closed before completing login', { variant: 'error', autoHideDuration: 2000 })
        else
            enqueueSnackbar(response?.error, { variant: 'error', autoHideDuration: 2000 })
    }
    return (
        <div className="Login">
            <label>Login Using Google </label>
            <GoogleLogin
                clientId="638367321598-klgh4fml3thf7dhdng9nmvrf2ffub88s.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={LoginSuccess}
                onFailure={LoginFailure}
                cookiePolicy={'single_host_origin'}
                scope='profile'
                style={{ width: '200px' }}
            />
        </div>
    );
}
