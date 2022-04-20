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
  let imgUrl = 'images/1.jpg';
  

  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();
  const { isAuthenticated, logout } = useAuth();
  const logoutHandler = () => {
    logout();
    enqueueSnackbar("Logged out successfully!", { variant: 'success', autoHideDuration: 2000 });
    history.push('/login');
  }
  return (
    <div className="App container py-3" 
    style={{
      backgroundImage: 'url("https://www.plantemoran.com/-/media/images/insights-images/2018/03/food-and-bev-capital-roundtable--article-image.jpg")',
      height:"600px", backgroundRepeat: "no-repeat"
    }}
    
    >
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand className="font-weight-bold text-muted">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <Nav.Link href="/">Home</Nav.Link>
            {isAuthenticated ? <Nav.Link href="/landing">Menu</Nav.Link> : ''}
            {isAuthenticated ? <GoogleLogout
              render={renderProps => (
                <Nav.Link onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</Nav.Link>
              )}
              clientId="209549426012-fmse3oog6vbndjajsbe1a3g8375tkl76.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logoutHandler}
            >
            </GoogleLogout> : ''}
            {!isAuthenticated ? <Nav.Link href="/login">Login</Nav.Link> : ''}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
