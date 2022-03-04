import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
const AuthContext = React.createContext(undefined);

const AuthProvider = ({ children }) => {
    const url = "https://groco-backend.herokuapp.com/user"
    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('googleId') ? true : false);
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState();
    const [googleId, setGoogleId] = useState();
    const login = async (props) => {
        setUserProfile(props.profileObj);
        setGoogleId(props.googleId);
        try {
            const getUrl = url + '/' + props.googleId // props.googleId;
            await axios.get(getUrl).then(response => {
                if (response.status == 200) {
                    setIsAuthenticated(true);
                    localStorage.setItem('googleId', props.googleId);
                }
                else if (response.status == 202) {
                    const createJSON = {
                        googleid: props.googleId,
                        user_email: props.profileObj.email,
                        first_name: props.profileObj.givenName,
                        last_name: props.profileObj.familyName,
                        image_url: props.profileObj.imageUrl,
                    }
                    axios.post(url, createJSON).then(res => {
                        console.log('New user created');
                        setIsAuthenticated(true);
                        localStorage.setItem('googleId', props.googleId);
                    })
                }
                else {
                    setIsAuthenticated(false)
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };
    const logout = (props) => {
        setGoogleId();
        setIsAuthenticated(false);
        localStorage.removeItem('googleId');
    }
    return <AuthContext.Provider value={{ login, logout, isAuthenticated, userProfile, googleId }}>{children}  </AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth can only be used inside AuthProvider");
    }
    return context;
};

export { useAuth, AuthProvider };
