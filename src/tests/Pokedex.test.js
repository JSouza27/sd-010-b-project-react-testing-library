import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';
import { pokemonType } from '../types';

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

  test('If the next pokemon is rendered', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Charmander');
  });
  test('if the first pokemon is rendered, when the list ends', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    const pokemon = screen.getByTestId('pokemon-name');

    pokemons.forEach((poke, index) => {
      if (poke[index] < pokemons.length) {
        userEvent.click(nextButton);
      }
      expect(pokemon).toHaveTextContent(pokemons[0].name);
    });
  });
  test('if it have the filter buttons', () => {
    renderWithRouter(<App />);

    const buttons = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    buttons.forEach((pokeType, index) => {
      const typeButtons = screen.getAllByTestId('pokemon-type-button');
      expect(typeButtons[index]).toHaveTextContent(pokeType);
    });
  });
});
