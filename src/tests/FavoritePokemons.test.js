import React from 'react';
import renderWithRouter from '../helpers/renderWithRouters';
import { FavoritePokemons } from '../components';

describe('Teste requisito 3 FavoritePokemons.js', () => {
  test(
    'Teste mensagem favoritePokemonFound, se não tiver pokémons favoritos.', () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      expect(getByText('No favorite pokemon found')).toBeInTheDocument();
    },
  );
});
