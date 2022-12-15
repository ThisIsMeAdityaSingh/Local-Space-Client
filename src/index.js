import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const renderRoot = document.getElementById('root');
const root = ReactDOM.createRoot(renderRoot);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);