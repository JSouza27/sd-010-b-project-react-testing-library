import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste component About', () => {
  test('Pagina contem um heading com text About Pokedex', () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(about);
    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });
});
