import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HeaderSearch from './HeaderSearch'
import HeaderFilm from './HeaderFilm'

const Header = () => (
    <header>
        <Switch>
            <Route exact path='/' component={HeaderSearch}/>
            <Route path='/search' component={HeaderSearch}/>
            <Route path='/film/:name' component={HeaderFilm}/>
        </Switch>
    </header>
);

export default Header;


