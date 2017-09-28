import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import ResultBox from '../ResultBox/ResultBox';
import './header.css';

class HeaderSearch extends React.Component{

    render(){
        return (
            <div className="header">
                <div className="fond-image">
                    <h4>
                        netflixroulette
                    </h4>
                    <SearchBox />
                </div>
                <div className="result-panel">
                    <ResultBox/>
                </div>
            </div>
        );
    }
}

export default HeaderSearch;
