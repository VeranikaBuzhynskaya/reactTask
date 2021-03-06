import { combineReducers } from 'redux'
import {
  SEARCH_FILMS, SORT_FILMS, REQUEST_FILMS, SELECT_SEARCH_TYPE, RECIEVE_FILMS, CHANGE_SEARCH_QUERY
} from '../actions/actions'

export default function reducer(state={
    searchType:'movie',
    films:[],
    sortBy: 'releaseDate',
    searchQuery: '',
}, action){
  switch (action.type){
      case SELECT_SEARCH_TYPE:{
          return Object.assign({}, state, { searchType: action.searchType });
      }
      case RECIEVE_FILMS: {
          return Object.assign({}, state, { films: action.films });
      }
      case SORT_FILMS: {
           return Object.assign({}, state, { sortBy: action.sortBy });
      }
      case CHANGE_SEARCH_QUERY:{
           return Object.assign({}, state, { searchQuery: action.searchQuery });
      }
      default: return state;
  }
}