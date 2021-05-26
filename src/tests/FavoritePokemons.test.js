import React from 'react';
import renderWithRouter from '../components/renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testa Favoritos', () => {
  test('Testa h2 favorito', () => {
    const { getByRole } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const favorito = getByRole('heading', { level: 2 });
    expect(favorito).toHaveTextContent('Favorite pokémons');
  });

  test('Testa se renderiza os pokemons favoritos', () => {
    const { queryAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    pokemons.forEach((__, index) => {
      const img = queryAllByText((_, { className }) => className === 'pokemon');
      expect(img[index]).toBeInTheDocument();
    });
  });

  test('notFound', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
