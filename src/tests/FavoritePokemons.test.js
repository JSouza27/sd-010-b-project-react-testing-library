import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Se é exibido na tela No favorite pokemon found, se não tiver favorito', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const phrase = getByText(/No favorite pokemon found/i);
  expect(phrase).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText } = renderWithRouter(<App />);
  const details = getByText(/More details/i);
  userEvent.click(details);
  const favorite = getByText(/Pokémon favoritado?/i);
  userEvent.click(favorite);
  const favoritePokemons = getByText(/Favorite Pokémons/i);
  userEvent.click(favoritePokemons);
  const namePokemon = getByText(/Pikachu/i);
  expect(namePokemon).toBeInTheDocument();
});
