import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

test('The message No favorite pokemon found is displayed on the screen.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const p = getByText('No favorite pokemon found').innerHTML;
  expect(p).toBe('No favorite pokemon found');
});

test('Test whether all your favorite Pokémon cards are displayed.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const img = getByText('Pikachu');
  console.log(img);
});
