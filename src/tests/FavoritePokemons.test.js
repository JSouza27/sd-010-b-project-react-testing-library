import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('É exibido na tela `No favorite pokemon found`, caso não tenha favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const errorMessage = 'No favorite pokemon found';
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
