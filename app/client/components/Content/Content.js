import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFound from './NotFound'
import ContentFilm from './ContentFilm'

const Content = () => (
        <Switch>
            <Route path='/search/:query' component={ContentFilm}/>
            <Route path='/film/:query' component={ContentFilm}/>
            <Route path='*' component={NotFound}/>
        </Switch>
);

export default Content;
