import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Exercicio 1', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('click in the home redirect Page home', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const linkHome = screen.getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
    fireEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('click in the About redirect Page about', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
    fireEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('click in the home redirect Page home', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(linkFavoritePokemons).toBeInTheDocument();
    fireEvent.click(linkFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('page redirect page not fou', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pageNotFound');
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
