import React from 'react';
import './poster.css';
import {connect} from 'react-redux';
import { selectFilm } from "../../actions/actions";
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom'

class Poster extends React.Component{
    constructor(props){
        super(props);

        this.clickFilm = this.clickFilm.bind(this);
    }

    clickFilm(){
        const id = this.props.match.params.id;
        this.props.onClickFilm(id);
    }

    render(){
        console.log(this.props);
        const info = this.props.info;
        return (
            <div className="poster">
                <Link to={`/film/${info.id}`} onClick={this.clickFilm()}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onClickFilm: (id) => {
            dispatch(selectFilm(id))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Poster));
