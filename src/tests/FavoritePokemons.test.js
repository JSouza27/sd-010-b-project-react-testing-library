import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testa componente favoritepokemon', () => {
  it('msg exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<App />);
    const favoritepokemon = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoritepokemon);
    const msg = /No favorite pokemon found/i;

    expect(screen.getByText(msg)).toBeInTheDocument();
  });
});
