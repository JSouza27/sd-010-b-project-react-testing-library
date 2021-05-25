import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente Favorite', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const error = getByText('No favorite pokemon found');

    expect(error).toBeInTheDocument();
  });
});
