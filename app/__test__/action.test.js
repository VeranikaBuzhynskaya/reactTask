import * as actions from '../client/actions/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockDataFilms from './mockDataOfFilms'
import mockDataOneFilm from './mockDataOfUniqueFilm'


describe('actions', () => {
    it('should create an action to search film by selected type', () => {
        const searchType = 'movie';
        const expectedAction = {
            type: 'SELECT_SEARCH_TYPE',
            searchType
        };
        expect(actions.selectSearchType(searchType)).toEqual(expectedAction)
    });

    it('should create an action to sort films by selected type', () => {
        expect(actions.sortFilms('releaseDate'))
            .toEqual({ type:'SORT_FILMS', sortBy: 'releaseDate' })
    });

    it('should create an action to select clicked film ', () => {
        expect(actions.selectFilm(199951))
            .toEqual({ type:'SELECT_FILMS', filmID: 199951 })
    });

    it('fetch films by input query', (done) => {
        let state = {
            storeFilms: {
                searchType:'movie',
                    films:[],
                    sortBy: 'releaseDate',
                    searchQuery: '',
            }
        };
        const mockStore = configureMockStore([thunk]);
        const store = mockStore(state);
        const query = 'tarantino';
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                resolve({
                    json: () => { return {results: mockDataFilms} }
                });
            });
        });
        store.dispatch(actions.searchFilms(query)).then(() => {
            expect(store.getActions()).toEqual([{ type: 'RECIEVE_FILMS', films: mockDataFilms }]);
            done();
        });
    });

    it('fetch by selected film', (done) => {
        let state = {
            storeDetailFilm: {
                filmID: 199951,
                filmUnique: {},
                filmsSimilar: [],
            },
            storeFilms: {
                searchType:'movie',
                films:[],
                sortBy: 'releaseDate',
                searchQuery: '',
            }
        };
        const mockStore = configureMockStore([thunk]);
        const store = mockStore(state);
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                resolve({
                    json: () => mockDataOneFilm
                });
            });
        });
        store.dispatch(actions.findFilm(state.storeDetailFilm.filmID)).then(() => {
            expect(store.getActions()).toEqual([{ type: 'RECIEVE_UNIQUE_FILM', filmUnique: mockDataOneFilm }]);
            done();
        });
    });
});
