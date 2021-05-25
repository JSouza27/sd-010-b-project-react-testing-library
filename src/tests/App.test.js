import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('test App component', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('header has links,first being the "Home"then "About" and finally "Favorite Pokemon"',
    () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const home = getByText('Home');
      const about = getByText('About');
      const favoritePokemon = getByText('Favorite Pokémons');

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favoritePokemon).toBeInTheDocument();

      const nav = getByTestId('nav-header');

      expect(nav.childNodes[0]).toBe(home);
      expect(nav.childNodes[1]).toBe(about);
      expect(nav.childNodes[2]).toBe(favoritePokemon);
    });

  it('test if is redirected to home if click on home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');

    expect(home).toBeInTheDocument();
    fireEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const pokedex = getByText('Pokédex');
    expect(pokedex).toBeInTheDocument();
  });

  it('test if is redirected to about if click on About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText('About');
    expect(about).toBeInTheDocument();
    fireEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const h2 = getByText('About Pokédex');
    expect(h2).toBeInTheDocument();
  });

  it('test if is redirected to Pokemons Favoritos if click on Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favoritePokemon = getByText('Favorite Pokémons');
    expect(favoritePokemon).toBeInTheDocument();
    fireEvent.click(favoritePokemon);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const h2 = getByText('Favorite pokémons');
    expect(h2).toBeInTheDocument();
  });

  it('test if not found component is rendered if access non existent url', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/workingonit');

    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
