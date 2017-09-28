import React from 'react';
import Poster from '../PosterFilm/Poster';
import './content.css';

const FilmAPI = {
    films: [
        {number: 1, name: "Ben Blocker", genre: "Comedies", releaseDate: "2014", author: "Quentin Tarantino"},
        {number: 2, name: "Dave Defend", genre: "Dramas", releaseDate: "2015", author: "Quentin Tarantino"},
        {number: 3, name: "Sam Sweeper", genre: "Dramas", releaseDate: "2014", author: "Quentin Tarantino"},
        {number: 4, name: "Matt Midfiel", genre: "Thriller", releaseDate: "2015", author: "Big Dealan"},
        {number: 5, name: "Will Winger", genre: "Thriller", releaseDate: "2014", author: "Big Dealan"},
        {number: 6, name: "Fillipe Forw", genre: "Comedies", releaseDate: "2016", author: "Big Dealan"},
        {number: 7, name: "William Win", genre: "Thriller", releaseDate: "2017", author: "Gvinet Paltrou"},
        {number: 8, name: "Fil Forward", genre: "Comedies", releaseDate: "2016", author: "Gvinet Paltrou"}
    ],
    all: function() { return this.films},
    get: function(id) {
        const isFilm = p => p.number === id;
        return this.films.find(isFilm)
    }
};

class ContentFilm extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        console.log(this.props.state);
        return (
            <div className="content">
                {
                    FilmAPI.all().filter(p => p.name.indexOf(this.props.match.params.query) !== -1)
                        .map(p => (
                        <Poster info={p} key={p.number} />
                    ))
                }
            </div>
        );
    }
}

export default ContentFilm;
