import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import ResultBox from '../ResultBox/ResultSortBox';
import NoResultBox from '../ResultBox/NoResultBox';
import { Switch, Route } from 'react-router-dom'
import './header.css';

class HeaderSearch extends React.Component{

    render(){
        return (
            <div className="header">
                <div className="header-part">
                    <div className="fond-image"></div>
                    <h4>
                        netflixroulette
                    </h4>
                    <SearchBox />
                </div>
                <div className="result-panel">
                    <Switch>
                        <Route exact path='/' component={NoResultBox}/>
                        <Route path='/search' component={ResultBox}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default HeaderSearch;
