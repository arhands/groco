import React, { useState, useContext } from "react";
const AuthContext = React.createContext(undefined);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState();
    const [googleId, setGoogleId] = useState();
    const login = (props) => {
        setUserProfile(props?.profileObj);
        setGoogleId(props?.googleId);
        setIsAuthenticated(true);
    };
    const logout = (props) => {
        setUserProfile();
        setGoogleId();
        setIsAuthenticated();
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
