/**
 * Federated Search - Frontend Entry Point
 * Author: V. Adams
 * Date: May 2025
 * Description: Entry point for the React application.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create a root element and render the App component
// This is the entry point of the React application

// Create a root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside StrictMode for additional checks and warnings
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
