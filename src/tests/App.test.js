import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const history = createMemoryHistory();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    const favoritePokemons = getByText('Favorite Pokémons');
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('if it redirects to home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('if it redirects to about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const about = getByText('About');
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('if it redirects to favorite pokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const favoritePokemons = getByText('Favorite Pokémons');
    expect(favoritePokemons).toBeInTheDocument();
    fireEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('if it redirects to not found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    history.push('/páginaqualquerblablabla');
    const { pathname } = history.location;
    expect(pathname).toBe('/páginaqualquerblablabla');
    const notFoundText = getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
