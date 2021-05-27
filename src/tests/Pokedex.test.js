import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing Pokedex.js', () => {
  it('verify if have a h2 text with "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encounteredPokemons = getByRole('heading', {
      level: 2,
      name: /encountered pok[eé]mons/i,
    });

    expect(encounteredPokemons).toBeInTheDocument();
  });
});
