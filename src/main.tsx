import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./Views/Home";
import './assets/CSS/index.css';
import './assets/CSS/MQ.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>,
)
