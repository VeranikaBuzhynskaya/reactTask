import React from 'react';
import './searchBox.css';

class SearchBox extends React.Component{
    render(){
        return (
            <form className="search-form">
                <h3 className="search-title">FIND YOUR MOVIE</h3>
                <input type="text" name="Search field" placeholder="Search:" className="search-field"/>
                <div className="search-part">
                    <div className="radios-as-buttons">
                        <p className="search-by-title">SEARCH BY</p>
                        <div>
                            <input type="radio" name="searchBy" id="title"/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div>
                            <input type="radio" name="searchBy" id="director"/>
                            <label htmlFor="director">Director</label>
                        </div>
                    </div>
                    <input type="button" value="SEARCH" className="search-button"/>
                </div>
            </form>
        );
    }
}

export default SearchBox;
