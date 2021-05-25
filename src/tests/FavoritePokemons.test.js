import React from 'react';
import { render, screen } from '@testing-library/react';

import { FavoritePokemons } from '../components';

describe('Teste da página favoritos', () => {
  test('Teste se é exibido na tela a mensagem se não houver favoritos', () => {
    render(<FavoritePokemons />);

    const noFav = screen.getByText('No favorite pokemon found');

    expect(noFav).toBeInTheDocument();
  });
});
