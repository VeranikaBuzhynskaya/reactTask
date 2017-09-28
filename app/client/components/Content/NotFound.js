import React from 'react';
import './content.css';

class NotFound extends React.Component{
    render(){
        return (
            <div className="content">
                <p className="notFoundFilm">
                    Not films found
                </p>
            </div>
        );
    }
}

export default NotFound;
