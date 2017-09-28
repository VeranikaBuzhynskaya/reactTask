import React from 'react';
import './moveDescription.css';

class MoveDescription extends React.Component{
    render(){
        return (
            <div className="move-description-part">
                <img className="poster-image" src="http://netflixroulette.net/api/posters/880640.jpg"/>
                <div className="description-part">
                    <h2>Pulp Fiction</h2>
                    <span className="raiting">4.1</span>
                    <p className="category">Oscar-winning Movies</p>
                    <div className="runtime-and-release-year">
                       <span>1994</span>
                       <span>154min</span>
                    </div>
                    <p className="description">
                        Weaving together three stories featuring a burger-loving hit man,
                        his philosophical partner and a washed-up boxer, Quentin Tarantino
                        influenced a generation of filmmakers with this crime caper's stylized,
                        over-the-top violence and dark comic spirit.
                    </p>
                    <div className="director-and-cast">
                        <p>Director: Quentin Tarantino</p>
                        <p>Cast: "John Travolta, Samuel L. Jackson, Uma Thurman, Bruce Willis,
                            Harvey Keitel, Tim Roth, Amanda Plummer, Ving Rhames, Eric Stoltz,
                            Maria de Medeiros
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MoveDescription;
