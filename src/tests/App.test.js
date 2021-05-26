import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Checks all App', () => {
  it('Checks the link "Home" redirects to "/".', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });

    expect(linkHome).toBeInTheDocument();

    fireEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Checks the link "About" redirects to "/about".', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });

    expect(linkAbout).toBeInTheDocument();

    fireEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Checks the link "Favorite Pokémons" redirects to "/favorites".', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(linkFavorites).toBeInTheDocument();

    fireEvent.click(linkFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Checks if an unknown url redirects to "Not Found".', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-exist');

    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
