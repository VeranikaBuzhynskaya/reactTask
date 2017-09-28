import React from 'react';
import {withRouter} from 'react-router-dom';
import './searchBox.css';

class SearchBox extends React.Component{
     constructor(props){
         super(props);
         this.history = props.history;
         this.state = {value: '',
         selectedOption: 'title'};


         this.handleChange = this.handleChange.bind(this);
         this.onSearchSubmit = this.onSearchSubmit.bind(this);
         this.handleOptionChange = this.handleOptionChange.bind(this);
     }

     onSearchSubmit(event){
         event.preventDefault();
         this.history.push(`/search/${this.state.value}`);
     }

     handleChange(event){
         this.setState({value: event.target.value});
     }

     handleOptionChange(changeEvent) {
        this.setState({selectedOption: changeEvent.target.id})
     }

    render(){
        return (
            <form className="search-form" onSubmit={this.onSearchSubmit}>
                <h3 className="search-title">FIND YOUR MOVIE</h3>
                <input type="text" name="Search field" placeholder="Search:" className="search-field" value={this.state.value} onChange={this.handleChange} />
                <div className="search-part">
                    <div className="radios-as-buttons">
                        <p className="search-by-title">SEARCH BY</p>
                        <div>
                            <input type="radio" name="searchBy" id="title" checked={this.state.selectedOption==='title'} onChange={this.handleOptionChange}/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div>
                            <input type="radio" name="searchBy" id="director" checked={this.state.selectedOption==='director'} onChange={this.handleOptionChange}/>
                            <label htmlFor="director">Director</label>
                        </div>
                    </div>
                    <input type="button" value="SEARCH" className="search-button" onClick={this.onSearchSubmit}/>
                </div>
            </form>
        );
    }
}

export default withRouter(SearchBox);
