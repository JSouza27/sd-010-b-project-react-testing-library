import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';

import App from '../App';
import pokemons from '../data';

describe('test component PokemonDetails', () => {
  test('if page contais title "pokemon name" details', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const { name } = pokemons[0];
    const pageTitle = screen.getByRole('heading', { name: `${name} Details` });
    expect(pageTitle).toBeInTheDocument();
  });
});
