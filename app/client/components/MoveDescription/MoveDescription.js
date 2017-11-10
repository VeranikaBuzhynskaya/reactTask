import React from 'react';
import './moveDescription.css';
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

    render(){
        const info = this.props.info;
        console.log(info);
        return (
            <div className="move-description-part">
                <img className="poster-image" src={info.poster_path ? 'https://image.tmdb.org/t/p/w500' +
                info.poster_path : 'https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png'}/>
                <div className="description-part">
                    <h2>{info.title || info.name}</h2>
                    <p className="raiting">Raiting: <span className="raiting-average">{info.vote_average}</span></p>
                    <div className="runtime-and-release-year">
                       <span>{info.release_date || info.first_air_date}</span>
                       <span>{info.runtime} min</span>
                    </div>
                    <p className="description">
                        {info.overview}
                    </p>
                    <div className="genres-and-production-countries">
                        <p>Genres: {info.genres ? info.genres[0].name : ''}</p>
                        <p>Production countries: {info.production_countries
                            ? info.production_countries[0].name
                            : ''}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        filmID: store.storeDetailFilm.filmID,
        info: store.storeDetailFilm.filmUnique
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
