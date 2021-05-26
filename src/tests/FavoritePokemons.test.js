import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithMemoryRouter from './renderWithMemoryRouter';

describe('Requisito 3', () => {
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { getByText } = renderWithMemoryRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
