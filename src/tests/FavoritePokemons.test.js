import React from 'react';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente "Favorite Pokémons"', () => {
  test('Verifica se há a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemonsText = getByText('No favorite pokemon found');

    expect(noFavoritePokemonsText).toBeInTheDocument();
  });
});
