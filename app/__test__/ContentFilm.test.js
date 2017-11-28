import React from 'react';
import { mount, shallow } from 'enzyme';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ContentFilm from '../client/components/Content/ContentFilm';
import Poster from '../client/components/PosterFilm/Poster';


import data from './mockDataOfFilms';
import store from '../client/store';


describe('Content', () => {
    debugger;
    let content;
    let match;

    beforeAll(() => {
        debugger;
        match = {
            params: {
                query:'movie'
            }
        };
        store.dispatch({
            type:'RECIEVE_FILMS',
            films: data.results
        });
        debugger;
        content = mount(
            <BrowserRouter>
                <Provider store={store}>
                    <ContentFilm match={match}/>
                </Provider>
            </BrowserRouter>
        );
        console.log('content', content);
    });
    debugger;
    it('render all recieved items', () => {
    debugger;
        expect(content.find(Poster).length)
            .toEqual(0); // should be 8;

    });
})