import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import App from '../App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
// component

describe('Check if Pokedex is the home page and if the route links work ', () => {
     // Home
  test('check home', () => {
      const history = createMemoryHistory();    // checando a home page
        render( <Router history={ history }>
                  <App />
                </Router>); 
        // page have a home button?
        const home = screen.getByRole('link', {
          name :'Home',
        });
        expect(home).toBeInTheDocument();      
    });
    // About
    test('check About', () => {
      const history = createMemoryHistory();    // checando a home page
        render( <Router history={ history }>
                  <App />
                </Router>); 
        const About = screen.getByRole('link', {
          name :'About',
        });
        expect(About).toBeInTheDocument();      
    });
        // About
    test('check Favorite Pokémons', () => {
      const history = createMemoryHistory();    // checando a home page
        render( <Router history={ history }>
                  <App />
                </Router>); 
        // page have a home button?
        const favoritePokemons = screen.getByRole('link', {
          name :'Favorite Pokémons',
        });
        expect(favoritePokemons).toBeInTheDocument();      
    });

});
// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(

//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });
