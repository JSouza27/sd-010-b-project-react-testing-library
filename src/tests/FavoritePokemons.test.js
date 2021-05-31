import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testando  pokemons favoritos', () => {
  it('titulo', () => {
    renderWithRouter(<FavoritePokemons />);
    const titulo = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(titulo).toBeInTheDocument();
  });
  it(' verifica quando não tem pokemons favoritos ', () => {
    renderWithRouter(<FavoritePokemons />);
    const notf = screen.getByText('No favorite pokemon found');
    expect(notf).toBeInTheDocument();
  });
});
