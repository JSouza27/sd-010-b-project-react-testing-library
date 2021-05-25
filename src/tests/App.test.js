import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Test the component <App />', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);

    expect(heading).toBeInTheDocument();
  });

  test('top of the application must contain a fixed set of navigation links', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByText(/Home/i);
    const textAbout = screen.getByText(/About/i);
    const textFavorite = screen.getByText(/Favorite Pokémons/i);

    expect(textHome).toBeInTheDocument();
    expect(textAbout).toBeInTheDocument();
    expect(textFavorite).toBeInTheDocument();
  });

  test('renders the page Home of the application in the URL path "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });

    userEvent.click(linkHome);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('renders the page About of the application in the URL path "/About"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });

    userEvent.click(linkAbout);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('renders the page Favoritados of the application in the URL path "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

      userEvent.click(linkFavorites);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });

  test('renders the page  not found of the application in the URL path desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/Página-que-não-existe');

      const noMatch = screen.getByText('Page requested not found');

      expect(noMatch).toBeInTheDocument();
    });
});
