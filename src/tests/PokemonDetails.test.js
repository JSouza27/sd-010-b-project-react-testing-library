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
    const pageTitle = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    expect(pageTitle).toBeInTheDocument();
  });

  test('if link more detais is not render in the details, page', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    expect(moreDetailsButton).not.toBeInTheDocument();
  });
  test('Summary heading and text', () => {
    renderWithRouter(<App />);

    const { summary } = pokemons[0];

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const pageTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(pageTitle).toBeInTheDocument();

    const pokemonText = screen.getByText(summary);
    expect(pokemonText).toBeInTheDocument();
  });
});
