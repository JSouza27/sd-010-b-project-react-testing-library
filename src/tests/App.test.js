import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('test component App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('nav link home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('nav link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('nav link Favorite Pokemons', () => {
    const { history } = renderWithRouter(<App />);

    const favPokemonLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favPokemonLink).toBeInTheDocument();

    userEvent.click(favPokemonLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('not existing path and render page not found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/page/that-doesnt-exists');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
