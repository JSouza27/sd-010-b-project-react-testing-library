import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

test('Test if message shows if there are no favorite pokémons', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const message = getByText('No favorite pokemon found');
  expect(message).toBeInTheDocument();
});

// testa se nenhum card é exibido quando não há favoritos
test('No cards are shown if there are no favorites', () => {
  const { queryByTestId } = renderWithRouter(<FavoritePokemons />);
  const pokemonCard = queryByTestId('pokemon-name');
  expect(pokemonCard).toBeNull();
});

// favorita dois pokémons e testa se eles são exibidos
test('favorite a pokémon and see if it is shown', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const details = screen.getByText(/more details/i);
  expect(details).toBeInTheDocument();
  userEvent.click(details);
  const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(checkboxFavorite);
  render(<FavoritePokemons />);
  const summary = screen.getByText(/summary/i);
  expect(summary).toBeInTheDocument();
});
