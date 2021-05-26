import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se os detalhades do Pokémon selecionado são mostradas na tela.', () => {
  test('A página deve ter um texto <name> Details;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const titlePikachu = screen.getByRole('heading', { name: /pikachu details/i });
    expect(titlePikachu).toBeInTheDocument();
  });

  test('Testa se link "More details" não é renderizado.', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    expect(details).not.toBeInTheDocument();
  });
});
