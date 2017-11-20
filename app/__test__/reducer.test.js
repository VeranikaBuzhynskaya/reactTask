import filmsReducer from '../client/reducers/filmsReducer'
import oneFilmReducer from '../client/reducers/oneFilmReducer'
import mockDataFilms from './mockDataOfFilms'
import mockDataOneFilm from './mockDataOfUniqueFilm'

describe('films reducer', () => {
    it('should return the initial state', () => {
        expect(filmsReducer(undefined, {})).toEqual(
            {
                searchType: 'movie',
                films: [],
                sortBy: 'releaseDate',
                searchQuery: '',
            }
        )
    });

    it('should handle SELECT_SEARCH_TYPE', () => {
        expect(
            filmsReducer([], {
                type: "SELECT_SEARCH_TYPE",
                searchType: 'tv'
            })
        ).toEqual(
                { searchType: 'tv',}
            )
    });

    it('should handle RECIEVE_FILMS and return correct data', () => {
        expect(filmsReducer({}, {
                type: 'RECIEVE_FILMS',
                films: mockDataFilms,
            })
        ).toEqual(
            {"films": mockDataFilms }
        );
    });

    it('should handle SORT_FILMS', () => {
        expect(
            filmsReducer([], {
                type: "SORT_FILMS",
                sortBy: 'raiting'
            })
        ).toEqual(
            {
                sortBy: 'raiting',
            })
    });

    it('should handle CHANGE_SEARCH_QUERY', () => {
        expect(
            filmsReducer([], {
                type: "CHANGE_SEARCH_QUERY",
                searchQuery: 'tarantino'
            })
        ).toEqual(
            {searchQuery: 'tarantino',}
            )
    });
});

describe('unique film reducer', () => {
    it('should return the initial state', () => {
        expect(oneFilmReducer(undefined, {})).toEqual(
            {
                filmID: null,
                filmUnique: {},
                filmsSimilar: [],
            }
        )
    });

    it('should handle SELECT_FILMS', () => {
        expect(
            oneFilmReducer([], {
                type: "SELECT_FILMS",
                filmID: 199951
            })
        ).toEqual(
            { filmID: 199951}
        )
    });

    it('should handle RECIEVE_UNIQUE_FILM and return correct data', () => {
        expect(oneFilmReducer({}, {
                type: 'RECIEVE_UNIQUE_FILM',
                filmUnique: mockDataOneFilm,
            })
        ).toEqual(
            {filmUnique: mockDataOneFilm }
        );
    });

    it('should handle RECIEVE_SIMILAR_FILMS and return correct data', () => {
        expect(oneFilmReducer({}, {
                type: 'RECIEVE_SIMILAR_FILMS',
                filmsSimilar: mockDataFilms ,
            })
        ).toEqual(
            {filmsSimilar: mockDataFilms }
        );
    });

});

