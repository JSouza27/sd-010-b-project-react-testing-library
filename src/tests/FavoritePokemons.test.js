import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando toda a aplicação da tela FavoritePokemons', () => {
  it('Verifica se o título aparece na tela', () => {
    renderWithRouter(<FavoritePokemons />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se aparece na tela No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  });
});
