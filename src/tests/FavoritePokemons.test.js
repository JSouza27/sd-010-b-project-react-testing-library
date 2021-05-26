import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Requirement 3', () => {
  test('No favorite Pokémon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFavorite = getByText('No favorite pokemon found');
    expect(notFavorite).toBeInTheDocument();
  });
});
