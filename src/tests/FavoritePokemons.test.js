import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('se é exibido na tela No favorite pokemon found, se não tiver favorito', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const phrase = getByText(/No favorite pokemon found/i);
  expect(phrase).toBeInTheDocument();
});
