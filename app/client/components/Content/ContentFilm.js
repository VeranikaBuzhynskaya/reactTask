import React from 'react';
import Poster from '../PosterFilm/Poster';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { searchFilms } from "../../actions/actions";
import './content.css';
 

class ContentFilm extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.requestFilms();
    }

    requestFilms(){
        const query = this.props.match.params.query;
        this.props.fetchFilms(query);
    }

    render(){
        // this.requestFilms();
        console.log(this.props.state);
        const films = this.props.films
        .map(film => {
            return {
                name: film.title,
                releaseDate: film.release_date,
                raiting: film.vote_average,
                posterImage: film.poster_path,
                id: film.id
            }
        }).map(film =>{return ( <Poster info={film} key={film.id.toString()} />)})
        return (
            <div className="content">
            {films.length===0 ?
                (<p className="notFoundFilm">
                    No films found
                </p>)
                :(films)
            }
            </div>
        );
    }
}

const mapStateToProps = function(store) {
  return {
      films: store.storeFilms.films
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilms: (query) => {
        dispatch(searchFilms(query))
    }
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ContentFilm));