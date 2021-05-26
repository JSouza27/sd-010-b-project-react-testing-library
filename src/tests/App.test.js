import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

describe('routes', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('test if the first link exists with the text `Home`', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const homeLink = getByRole('link', {
      name: 'Home',
    });
    const heading = getByText(/Home/i);
    expect(heading).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  test('test if the second link exists with the text `About`', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const homeLink = getByRole('link', {
      name: 'About',
    });
    const heading = getByText(/About/i);
    expect(heading).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  test('test if the third link exists with the text `Favorite Pokémons`', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const homeLink = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    const heading = getByText(/Favorite Pokémons/i);
    expect(heading).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  test('test when clicks `Home` link you redirected to home page ', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    const homeLink = getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeInTheDocument();

    const heading = getByText(/Home/i);
    expect(heading).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;
    // console.log(pathname);
    expect(pathname).toBe('/');

    const pokedexText = getByText(/Pokédex/i);
    expect(pokedexText).toBeInTheDocument();
  });

  test('test when clicks `About` link you redirected to home page ', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    const homeLink = getByRole('link', {
      name: 'About',
    });
    expect(homeLink).toBeInTheDocument();

    const heading = getByText(/About/i);
    expect(heading).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;
    // console.log(pathname);
    expect(pathname).toBe('/about');

    const pokedexText = getByText(/About Pokédex/i);
    expect(pokedexText).toBeInTheDocument();
  });

  test('when clicks `Pokémons Favoritados` link you redirected to Pokémons Favoritados',
    () => {
      const { getByText, getByRole, history } = renderWithRouter(<App />);

      const homeLink = getByRole('link', {
        name: 'Favorite Pokémons',
      });
      expect(homeLink).toBeInTheDocument();

      const heading = getByText(/Favorite Pokémons/i);
      expect(heading).toBeInTheDocument();

      userEvent.click(homeLink);

      const { pathname } = history.location;
      // console.log(pathname);
      expect(pathname).toBe('/favorites');

      const pokedexText = getByText('Favorite pokémons');
      expect(pokedexText).toBeInTheDocument();
    });
});
