import React from 'react';
import './poster.css';

class Poster extends React.Component{
    render(){
        console.log(this.props);
        const info = this.props.info;
        return (
            <div className="poster">
                <div className="imageBlock"></div>
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
