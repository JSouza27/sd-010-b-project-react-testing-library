import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('É exibido a mensagem No favorite pokemon found, se não tiver favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
