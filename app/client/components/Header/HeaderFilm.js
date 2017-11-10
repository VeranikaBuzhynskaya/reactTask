import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import MoveDescription from '../MoveDescription/MoveDescription';
import ResultDirectorBox from '../ResultBox/ResultDirectorBox';
import './header.css';

class HeaderFilm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        // const query = this.props.searchQuery;
        return (
            <div className="header">
                <div className="header-part">
                    <div className="fond-image"></div>
                    <h4>
                        netflixroulette
                    </h4>
                    <Link to={`/search/${this.props.searchQuery}`}>
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

const mapStateToProps = function(store) {
    return {
        searchQuery: store.storeFilms.searchQuery
    };
};


export default connect(mapStateToProps)(HeaderFilm);
