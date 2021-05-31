import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 03 = Test FavoritePokemons.js', () => {
  test('Teste exibir a mensagem \'No favorie pokemon found\'.', () => {
    renderWithRouter(<FavoritePokemons />);

    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('Squiter')).not.toBeInTheDocument();
  });

  test('Test se é exibido todos os cards de pokémons favoritos', () => {
    render(<FavoritePokemons />);
  });
});
