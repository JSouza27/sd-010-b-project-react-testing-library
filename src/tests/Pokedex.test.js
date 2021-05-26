import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

// import pokemons from '../data';

describe('Test pokedex component', () => {
  test('If the page contais title "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pageTitle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pageTitle).toBeInTheDocument();
  });
});
