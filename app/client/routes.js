import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/home'


const Main = () => (
    <BrowserRouter>
        <Home/>
    </BrowserRouter>
);

export default Main;
