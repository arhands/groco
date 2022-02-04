import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "./auth";
import logo from './productLogo.png'
import "./App.css";
import Routes from "./Routes";
import { GoogleLogout } from 'react-google-login';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";


function App() {
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();
  const { isAuthenticated, logout } = useAuth();
  const logoutHandler = () => {
    logout();
    enqueueSnackbar("Logged out successfully!", { variant: 'success', autoHideDuration: 2000 });
    history.push('/login');
  }
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand className="font-weight-bold text-muted">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <Nav.Link href="/">Home</Nav.Link>
            {isAuthenticated ? <Nav.Link href="/mealplans">Meal Plans</Nav.Link> : ''}
            {isAuthenticated ? <GoogleLogout
              render={renderProps => (
                <Nav.Link onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</Nav.Link>
              )}
              clientId="638367321598-klgh4fml3thf7dhdng9nmvrf2ffub88s.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logoutHandler}
            >
            </GoogleLogout> : ''}
            {!isAuthenticated ? <Nav.Link href="/signup">Signup</Nav.Link> : ''}
            {!isAuthenticated ? <Nav.Link href="/login">Login</Nav.Link> : ''}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
