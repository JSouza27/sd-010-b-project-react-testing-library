import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

// component

describe('1 - Check if Pokedex is the home page and if the route links work ', () => {
  // Home
  test('Check home', () => {
    const history = createMemoryHistory(); // checando a home page
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    // page have a home button?
    const home = screen.getByRole('link', {
      name: 'Home',
    });
    // por algum motivo o userEvent não funcionou!
    // aprender quando usar o fireEvent e quando usar o userEvent
    userEvent.click(home);
    const { pathname } = history.location;
    expect(home).toBeInTheDocument();
    expect(pathname).toBe('/');
  });
  // About
  test('Check About', () => {
    const history = createMemoryHistory(); // checando a home page
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const About = screen.getByRole('link', {
      name: 'About',
    });
    // por algum motivo o userEvent não funcionou!
    userEvent.click(About);
    const { pathname } = history.location;
    expect(About).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });
  // About
  test('Check Favorite Pokémons', () => {
    const history = createMemoryHistory(); // checando a home page
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    // page have a home button?
    const favoritePokemons = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    // por algum motivo o userEvent não funcionou!
    userEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(favoritePokemons).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });
});
