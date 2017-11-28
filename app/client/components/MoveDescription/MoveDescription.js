import React from 'react';
import styles from './moveDescription.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { findFilm } from "../../actions/actions";

class MoveDescription extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.requestUniqueFilm();
    }

    componentWillUpdate(){
        this.requestUniqueFilm();
    }

    requestUniqueFilm(){
        console.log("movieDesc", this.props.match.params.query );
        const id = this.props.match.params.query;
        this.props.showUniqueFilm(id);
    }

    infoOfFilm(info){
        if(this.props.searchType === "movie"){
            return {
                title: info.title,
                raiting: info.vote_average || '?',
                release_date: info.release_date,
                runtime: info.runtime,
                overview: info.overview,
                genres: info.genres ? info.genres[0].name : 'indefined',
                production_countrie: info.production_countries
                    ? info.production_countries[0].name
                    : 'indefined'

            };
        }else{
            return {
                title: info.name,
                raiting: info.vote_average || '?',
                release_date: info.first_air_date,
                runtime: info.episode_run_time
                    ? info.episode_run_time[0]
                    : 'indefined',
                overview: info.overview,
                genres: info.genres ? info.genres[0].name : 'indefined',
                production_countrie: info.origin_country
                    ? info.origin_country[0]
                    : 'indefined'
            };
        }
    }

    render(){
        const info = this.props.info;
        const infoFilm = this.infoOfFilm(info);
        return (
            <div className="move-description-part">
                <img className="poster-image" src={info.poster_path ? 'https://image.tmdb.org/t/p/w500' +
                info.poster_path : 'https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png'}/>
                <div className="description-part">
                    <h2>{infoFilm.title}</h2>
                    <p className="raiting">Raiting: <span className="raiting-average">{infoFilm.raiting}</span></p>
                    <div className="runtime-and-release-year">
                       <span>{infoFilm.release_date}</span>
                       <span>{infoFilm.runtime} min</span>
                    </div>
                    <p className="description">
                        {infoFilm.overview}
                    </p>
                    <div className="genres-and-production-countries">
                        <p>Genres: {infoFilm.genres}</p>
                        <p>Production countries: {infoFilm.production_countrie}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        filmID: store.storeDetailFilm.filmID,
        info: store.storeDetailFilm.filmUnique,
        searchType: store.storeFilms.searchType
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showUniqueFilm: (id) => {
            dispatch(findFilm(id))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoveDescription));
