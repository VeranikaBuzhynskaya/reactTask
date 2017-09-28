import React from 'react';
import './poster.css';
import { Link } from 'react-router-dom'

class Poster extends React.Component{
    render(){
        console.log(this.props);
        const info = this.props.info;
        return (
            <div className="poster">
                <Link to={`/film/${info.name}`}>
                    <div className="imageBlock"></div>
                </Link>
                <div className="film-info">
                    <div className="film-inform">
                        <span>{info.name}</span>
                        <span>{info.releaseDate}</span>
                    </div>
                    <div>
                        <span>{info.genre}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Poster;
