import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);

  const initialPage = history.location.pathname;
  const heading = getByText(/encountered pokémons/i);
  expect(initialPage).toBe('/');
  expect(heading).toBeInTheDocument();

  const linkHome = getByRole('link', {
    name: 'Home',
  });
  expect(linkHome).toBeInTheDocument();

  const linkAbout = getByRole('link', {
    name: 'About',
  });
  expect(linkAbout).toBeInTheDocument();

  const linkFavoritePokemons = getByRole('link', {
    name: 'Favorite Pokémons',
  });
  expect(linkFavoritePokemons).toBeInTheDocument();

  history.push('pagina/pagina-nao-encontrada');

});
