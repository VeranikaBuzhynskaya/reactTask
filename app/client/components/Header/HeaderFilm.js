import React from 'react';
import MoveDescription from '../MoveDescription/MoveDescription';
import ResultDirectorBox from '../ResultDirectorBox/ResultDirectorBox';
import './header.css';

class HeaderFilm extends React.Component{
    render(){
        return (
            <div className="header">
                <div className="fond-image">
                    <h4>
                        netflixroulette
                    </h4>
                    <input type="button" value="SEARCH" className="search-button-move"/>
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
