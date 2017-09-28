import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import App from './spa/App';

ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.getElementById("app"));
