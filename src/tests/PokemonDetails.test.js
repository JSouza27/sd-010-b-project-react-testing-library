import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se os detalhades do Pokémon selecionado são mostradas na tela.', () => {
  test('A página deve ter um texto <name> Details;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent(details);

    const titlePikachu = screen.getByRole('heading', { name: /pikachu details/i });
    expect(titlePikachu).toBeInTheDocument();
  });
});
