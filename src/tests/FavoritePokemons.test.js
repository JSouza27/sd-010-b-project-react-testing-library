import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';

import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Testa mensagem No favorite pokemon found.', () => {
    renderWithRouter(<FavoritePokemons />);

    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
