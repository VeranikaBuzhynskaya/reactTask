import {
    SELECT_FILMS, RECIEVE_UNIQUE_FILM
} from '../actions/actions'

export default function reducer(state={
    filmID: null,
    filmUnique: {},
}, action){
    switch (action.type){
        case SELECT_FILMS: {
            return Object.assign({}, state, { filmID: action.filmID });
        }
        case RECIEVE_UNIQUE_FILM : {
            return Object.assign({}, state, { filmUnique: action.filmUnique });
        }
        default: return state;
    }
}