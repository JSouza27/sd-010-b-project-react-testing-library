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
  });
});
