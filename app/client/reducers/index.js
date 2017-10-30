import {combineReducers} from "redux";

import filmsReducer from "./filmsReducer";
import oneFilmReducer from "./oneFilmReducer";

console.log(filmsReducer);
console.log(oneFilmReducer);

export const rootReducer = combineReducers({
    storeFilms: filmsReducer,
    storeDetailFilm: oneFilmReducer,
});




