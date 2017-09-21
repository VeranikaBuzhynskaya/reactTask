import React from 'react';
import './resultBox.css';

class ResultBox extends React.Component{
    render(){
        return (
            <div className="sort-part">
                <p className="count-movies">7 movies found</p>
                <div className="radios-as-text">
                    <p className="sort-by-title">Sort by</p>
                    <div>
                        <input type="radio" name="sortBy" id="releaseDate"/>
                        <label htmlFor="releaseDate">release data</label>
                    </div>
                    <div>
                        <input type="radio" name="sortBy" id="raiting"/>
                        <label htmlFor="raiting">raiting</label>
                    </div>
                </div>
             </div>
        );
    }
}

export default ResultBox;
