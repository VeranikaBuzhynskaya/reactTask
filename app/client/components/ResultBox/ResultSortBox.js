import React from 'react';
import './resultBox.css';

class ResultSortBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedSort: 'releaseDate'
        };
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    handleSortChange(changeEvent) {
        this.setState({selectedSort: changeEvent.target.id})
    }
    render(){
        return (
            <div className="sort-part">
                <p className="count-movies">7 movies found</p>
                <div className="radios-as-text">
                    <p className="sort-by-title">Sort by</p>
                    <div>
                        <input type="radio" name="sortBy" id="releaseDate" checked={this.state.selectedSort==='releaseDate'} onChange={this.handleSortChange}/>
                        <label htmlFor="releaseDate">release data</label>
                    </div>
                    <div>
                        <input type="radio" name="sortBy" id="raiting" checked={this.state.selectedSort==='raiting'} onChange={this.handleSortChange}/>
                        <label htmlFor="raiting">raiting</label>
                    </div>
                </div>
             </div>
        );
    }
}

export default ResultSortBox;
