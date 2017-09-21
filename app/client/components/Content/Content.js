import React from 'react';
import Poster from '../PosterFilm/Poster';
import './content.css';

const FilmAPI = {
    films: [
        {number: 1, name: "Ben Blocker", genre: "Comedies", releaseDate: "2014"},
        {number: 2, name: "Dave Defend", genre: "Dramas", releaseDate: "2015"},
        {number: 3, name: "Sam Sweeper", genre: "Dramas", releaseDate: "2014"},
        {number: 4, name: "Matt Midfiel", genre: "Thriller", releaseDate: "2015"},
        {number: 5, name: "Will Winger", genre: "Thriller", releaseDate: "2014"},
        {number: 6, name: "Fillipe Forw", genre: "Comedies", releaseDate: "2016"},
        {number: 7, name: "William Win", genre: "Thriller", releaseDate: "2017"},
        {number: 8, name: "Fil Forward", genre: "Comedies", releaseDate: "2016"}
    ],
    all: function() { return this.films},
    get: function(id) {
        const isFilm = p => p.number === id;
        return this.films.find(isFilm)
    }
};

class Content extends React.Component{

    render(){
        return (
            <div className="content">
                {
                    FilmAPI.all().map(p => (
                        <Poster info={p} key={p.number} />
                    ))
                }
            </div>
        );
    }
}

export default Content;
