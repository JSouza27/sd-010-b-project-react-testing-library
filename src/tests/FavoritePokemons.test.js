import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

test('Test if "No favorite pokemon found", when you have no favorite pokemon', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);

  const favoriteText = getByText(/No favorite pokemon found/i);

  expect(favoriteText).toBeInTheDocument();
});
