import React from 'react';
import {connect} from 'react-redux';
import {sortFilms} from "../../actions/actions";
import './resultBox.css';

class ResultSortBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedSort: 'releaseDate'
        };
    }

    render(){
        return (
            <div className="sort-part">
                <p className="count-movies">{this.props.countFilms ?
                    this.props.countFilms === 1 ? "Only one movie found" : this.props.countFilms + " movies found"
                    : "No movies found"}</p>
                <div className="radios-as-text">
                    <p className="sort-by-title">Sort by</p>
                    <div>
                        <input type="radio" name="sortBy" id="releaseDate" checked={this.props.selectedSort==='releaseDate'} onChange={this.props.handleSortChange}/>
                        <label htmlFor="releaseDate">release data</label>
                    </div>
                    <div>
                        <input type="radio" name="sortBy" id="raiting" checked={this.props.selectedSort==='raiting'} onChange={this.props.handleSortChange}/>
                        <label htmlFor="raiting">raiting</label>
                    </div>
                </div>
             </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        countFilms: store.storeFilms.films.length,
        selectedSort: store.storeFilms.sortBy
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSortChange: (changeEvent) => {
            dispatch(sortFilms(changeEvent.target.id))

        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(ResultSortBox);
