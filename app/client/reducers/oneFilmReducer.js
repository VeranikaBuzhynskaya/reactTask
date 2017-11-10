import {
    SELECT_FILMS, RECIEVE_UNIQUE_FILM, RECIEVE_SIMILAR_FILMS
} from '../actions/actions'

export default function reducer(state={
    filmID: null,
    filmUnique: {},
    filmsSimilar: [],
}, action){
    switch (action.type){
        case SELECT_FILMS: {
            return Object.assign({}, state, { filmID: action.filmID });
        }
        case RECIEVE_UNIQUE_FILM : {
            return Object.assign({}, state, { filmUnique: action.filmUnique });
        }
        case RECIEVE_SIMILAR_FILMS: {
            return Object.assign({}, state, { filmsSimilar: action.filmsSimilar });
        }
        default: return state;
    }
}