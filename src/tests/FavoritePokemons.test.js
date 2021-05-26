import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes do requisito 3', () => {
  it('verifica o componente <FavoritePokemons.js />', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const notPokemons = getByText(/No favorite pokemon found/i);

    expect(notPokemons).toBeInTheDocument();
  });
});
