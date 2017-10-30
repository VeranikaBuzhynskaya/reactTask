import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { selectSearchType, searchFilms } from "../../actions/actions"
import './searchBox.css';

class SearchBox extends React.Component{
     constructor(props){
         super(props);
         this.history = props.history;
         this.state = {value: '',
         selectedOption: 'movie'};


         this.handleChange = this.handleChange.bind(this);
          this.onSearchSubmit = this.onSearchSubmit.bind(this);
        //  this.handleOptionChange = this.handleOptionChange.bind(this);
     }

     onSearchSubmit(event){
         event.preventDefault();
         this.history.push(`/search/${this.state.value}`);
         this.props.onSearchUpdate(this.state.value);
         // searchFilms(this.state.value);

     }

     handleChange(event){
         this.setState({value: event.target.value});
     }

    //  handleOptionChange(changeEvent) {
    //     this.setState({selectedOption: changeEvent.target.id})
    //  }

    render(){
        return (
            <form className="search-form" onSubmit={this.onSearchSubmit}>
                <h3 className="search-title">FIND YOUR MOVIE</h3>
                <input type="text" name="Search field" placeholder="Search:" className="search-field" value={this.state.value} onChange={this.handleChange} />
                <div className="search-part">
                    <div className="radios-as-buttons">
                        <p className="search-by-title">SEARCH BY</p>
                        <div>
                            <input type="radio" name="searchBy" id="tv" checked={this.props.selectedOption==='tv'} onChange={this.props.handleOptionChange}/>
                            <label htmlFor="tv">TV Show</label>
                        </div>
                        <div>
                            <input type="radio" name="searchBy" id="movie" checked={this.props.selectedOption==='movie'} onChange={this.props.handleOptionChange}/>
                            <label htmlFor="movie">Movie</label>
                        </div>
                    </div>
                    <input type="button" value="SEARCH" className="search-button" onClick={this.onSearchSubmit}/>
                </div>
            </form>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    selectedOption: store.storeFilms.searchType
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOptionChange: (changeEvent) => {
      dispatch(selectSearchType(changeEvent.target.id))

    },
    onSearchUpdate: (query) =>{
        dispatch(searchFilms(query))
    }
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SearchBox));
