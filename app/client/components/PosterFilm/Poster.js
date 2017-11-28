import React from 'react';
import styles from './poster.css';
import {connect} from 'react-redux';
import { selectFilm } from "../../actions/actions";
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom'

class Poster extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const info = this.props.info;
        return (
            <div className="poster">
                <Link to={`/film/${info.id}`}>
                    <img className="imageBlock"  src={info.posterImage ? 'https://image.tmdb.org/t/p/w500' +
                    info.posterImage : 'https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png'}/>
                </Link>
                <div className="film-info">
                    <div className="film-inform">
                        <span>{info.name}</span>
                        <span>{info.releaseDate}</span>
                    </div>
                    <div>
                        <span className="genre">Raiting: {info.raiting}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        filmID: store.storeDetailFilm.filmID
    };
};

export default withRouter(connect(mapStateToProps)(Poster));
