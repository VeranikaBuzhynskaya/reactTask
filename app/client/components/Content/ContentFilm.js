import React from 'react';
import Poster from '../PosterFilm/Poster';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { searchFilms, findSimilarFilms } from "../../actions/actions";
import styles from'./content.css';
 

class ContentFilm extends React.Component{

    constructor(props){
        super(props);
        this.state = {query: ' '};
    }

    static fetchData(dispatch, match){
        if(match.url.indexOf('search') !== -1) {
            const query = match.params.query;
            return dispatch(searchFilms(query));
        } else {
            const id = match.params.query;
            return dispatch(findSimilarFilms(id));
        }
    }


    componentDidMount(){
        this.requestFilms();
    }

    requestFilms(){
        if(this.props.match.url.indexOf('search') !== -1) {
            const query = this.props.match.params.query;
            this.props.fetchFilms(query);
        } else {
            const id = this.props.match.params.query;
            this.props.fetchSimilarFilms(id);
        }
    }

    sortFilmsBy (sortBy, films){
        if(sortBy === "releaseDate") {
            films.sort(function (a, b) {
                const itemA = a.releaseDate || '0';
                const itemB = b.releaseDate || '0';
                return itemB.replace(/-/g, '')
                    - itemA.replace(/-/g, '');
            });
        }else {
            films.sort(function (a, b) {
                return b.raiting - a.raiting;
            });
        }
    }

    serializeFilmsComponents(){
        const films = ((this.props.match.url.indexOf('search') !== -1) ? this.props.films : this.props.filmsSimilar)
            .map(film => {
                return {
                    name: film.title || film.name,
                    releaseDate: film.release_date || film.first_air_date ,
                    raiting: film.vote_average,
                    posterImage: film.poster_path,
                    id: film.id
                }
            });
        return films;
    }

    render(){
        if(this.props.match.params.query !== this.state.query){
            this.setState({ query: this.props.match.params.query });
            this.requestFilms();
        }
        const films = this.serializeFilmsComponents();
        if(this.props.match.url.indexOf('search') !== -1){
            this.sortFilmsBy(this.props.sortBy, films);
        }
        const filmsComponents = films.map(film =>{
            return ( <Poster info={film} key={film.id.toString()} />)
            });
        return (
            <div className="content">
            {films.length===0 ?
                (<p className="notFoundFilm">
                    No films found
                </p>)
                :(filmsComponents)
            }
            </div>
        );
    }
}

const mapStateToProps = function(store) {
  return {
      films: store.storeFilms.films,
      sortBy: store.storeFilms.sortBy,
      filmsSimilar: store.storeDetailFilm.filmsSimilar,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilms: (query) => {
        dispatch(searchFilms(query))
    },
    fetchSimilarFilms: (id) => {
        dispatch(findSimilarFilms(id))
    }
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ContentFilm));