import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test "App" component', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders header with links for "Home", "About" and "Favorite Pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /home/i });
    const about = getByRole('link', { name: /about/i });
    const favoritePokemon = getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });

  it('redirects to "/" when click on link "Home"', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /home/i });

    userEvent.click(home);
    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/');
  });

  it('redirects to "/about" when click on link "About"', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const about = getByRole('link', { name: /about/i });

    userEvent.click(about);
    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/about');
  });

  it('redirects to "/favorites" when click on link "Favorite Pokémons"', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const favorites = getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favorites);
    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/favorites');
  });
  it('redirects to "Not found" when a invalid URL is give', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    history.push('testnotfound');
    const {
      location: { pathname },
    } = history;

    const requestNotFound = getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(pathname).toBe('/testnotfound');
    expect(requestNotFound).toBeInTheDocument();
  });
});
