import React from 'react';
import {
    Router,
    Route,
    browserHistory
} from 'react-router';

import Home from './components/home';

export default () => (
    <Router history={browserHistory}>
        <Route path='/' component={Home} />
    </Router>
);
