import React from 'react';
import { Link } from 'react-router-dom'
import MoveDescription from '../MoveDescription/MoveDescription';
import ResultDirectorBox from '../ResultBox/ResultDirectorBox';
import './header.css';

class HeaderFilm extends React.Component{
    render(){
        return (
            <div className="header">
                <div className="fond-image">
                    <h4>
                        netflixroulette
                    </h4>
                    <Link to='/'>
                        <input type="button" value="SEARCH" className="search-button-move"/>
                    </Link>
                    <MoveDescription/>
                </div>
                <div className="result-panel">
                    <ResultDirectorBox/>
                </div>
            </div>
        );
    }
}

export default HeaderFilm;
