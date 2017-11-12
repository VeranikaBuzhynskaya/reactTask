const path = 'https://api.themoviedb.org/3/';
const key = 'api_key=df4c6dbe30add802b058d74f2a7aa462';

export const SEARCH_FILMS = "SEARCH_FILMS";
export const SORT_FILMS = "SORT_FILMS";
export const REQUEST_FILMS = "REQUEST_FILMS";
export const RECIEVE_FILMS = "RECIEVE_FILMS";
export const SELECT_FILMS = "SELECT_FILMS";
export const SELECT_SEARCH_TYPE = "SELECT_SEARCH_TYPE";
export const RECIEVE_UNIQUE_FILM = "RECIEVE_UNIQUE_FILM";
export const RECIEVE_SIMILAR_FILMS = "RECIEVE_SIMILAR_FILMS";
export const CHANGE_SEARCH_QUERY = "CHANGE_SEARCH_QUERY";

function fetchFilms (url, dispatch){
    fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveFilms(json.results)))
    .catch(errors => console.log("Error: The problem with displaying of films in accordance with the search query ;("));
}

function fetchUniqueFilm (url, dispatch){
    fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receiveUniqueFilm(json)))
        .catch(errors => console.log("Error: Problems with displaying of the selected film ;("));
}

function fetchSimilarFilms (url, dispatch){
    fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receiveSimilarFilms(json.results)))
        .catch(errors => console.log("Error: Problem with displaying similar movies ;("));
}


export function searchFilms (query){
    return (dispatch, getState) => {
        const searchType = getState().storeFilms.searchType;
        fetchFilms(`${path}search/${searchType}?${key}&query=${query}&page=1`, dispatch);
    }
}

export function findFilm(id){
    return (dispatch, getState) => {
        const searchType = getState().storeFilms.searchType;
        fetchUniqueFilm(`${path}${searchType}/${id}?${key}`, dispatch);
    }
}

export function findSimilarFilms(id){
    return (dispatch, getState) => {
        const searchType = getState().storeFilms.searchType;
        fetchSimilarFilms(`${path}${searchType}/${id}/similar?${key}&page=1`, dispatch);
    }
}

function requestFilms(query) {
  return {
    type: REQUEST_FILMS,
    query
  }
}

function receiveFilms(films) {
  return {
    type: RECIEVE_FILMS,
    films: films
  }
}

function receiveUniqueFilm(film) {
    return {
        type: RECIEVE_UNIQUE_FILM,
        filmUnique: film
    }
}

export function changeSearchQuery(query) {
    return {
        type: CHANGE_SEARCH_QUERY,
        searchQuery: query
    }
}

function receiveSimilarFilms(filmsSimilar) {
    return {
        type: RECIEVE_SIMILAR_FILMS,
        filmsSimilar: filmsSimilar
    }
}

export function sortFilms(sortBy) {
  return {
    type: SORT_FILMS,
    sortBy
  }
}

export function selectFilm(filmID) {
  return {
    type: SELECT_FILMS,
    filmID
  }
}

export function selectSearchType(searchType) {
  return {
    type: SELECT_SEARCH_TYPE,
    searchType
  }
}