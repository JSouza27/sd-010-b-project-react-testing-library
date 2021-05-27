import React from 'react';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Tests of component FavoritePokémons.', () => {
  test('shows the message for no favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText('No favorite pokemon found');

    expect(message).toBeInTheDocument();
  });
});
