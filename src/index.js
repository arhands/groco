import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './auth.js'

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
