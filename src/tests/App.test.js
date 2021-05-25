import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

// component

describe('Check if Pokedex is the home page and if the route links work ', () => {
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
    fireEvent.click(About);
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
    fireEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(favoritePokemons).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });
});
