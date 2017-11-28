import React from 'react';
import { mount, shallow } from 'enzyme';
import { Link, BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import Poster from '../client/components/PosterFilm/Poster';
import renderer from 'react-test-renderer';

import data from './mockPosterData';
import store from '../client/store';

describe('Poster', () => {
  let posterFilm;

  beforeAll(() => {
    posterFilm = mount(
        <BrowserRouter>
          <Provider store={store}>
                <Poster info ={data} match={data}/>
          </Provider>
        </BrowserRouter>
    );
    debugger;
    console.log('posterFilm', <Poster info ={data}/> );
  })

  it('has correct title', () => {
    debugger;
    expect(posterFilm.find('.film-inform span').first().text())
        .toEqual('Quentin Tarantino: 20 Years of Filmmaking');
  });

  it('has correct raiting', () => {

    expect(posterFilm.find('.genre').text())
        .toEqual('Raiting: 9');
  });

  it('img has correct src', () => {

    expect(posterFilm.find('img').props().src)
      .toEqual('https://image.tmdb.org/t/p/w500/bzrTHS1JrC8BJszpqKHGX4rLnoV.jpg');
  });

  it('has correct release date', () => {

    expect(posterFilm.find('.film-inform span').last().text())
      .toEqual('2012-11-20');
  });

  it('matches snapshot for components Poster', () =>{
    const tree = renderer.create(
      <BrowserRouter>
      <Provider store={store}>
            <Poster info ={data} match={data}/>
      </Provider>
    </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
})