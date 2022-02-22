import React, { useState, useContext, useEffect } from "react";
const AuthContext = React.createContext(undefined);

const AuthProvider = ({ children }) => {
    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('googleId') ? true : false);
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState();
    const [googleId, setGoogleId] = useState();
    const login = (props) => {
        setUserProfile(props.profileObj);
        setGoogleId(props.googleId);
        console.log(props.googleId)
        setIsAuthenticated(true);
        localStorage.setItem('googleId', props.googleId);
    };
    const logout = (props) => {
        setUserProfile();
        setGoogleId();
        setIsAuthenticated();
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
