import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';
import pokemons from '../data';

const pokemon = 'pokemon-name';

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

    const currentPokemon = screen.getByTestId(pokemon);
    expect(currentPokemon).toHaveTextContent('Charmander');
  });

  test('if the first pokemon is rendered, when the list ends', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    const firstPokemon = screen.getByTestId(pokemon);

    pokemons.forEach((poke, index) => {
      if (poke[index] < pokemons.length) {
        userEvent.click(nextButton);
      }
      expect(firstPokemon).toHaveTextContent(pokemons[0].name);
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
  test('if the pokemons are filtered', () => {
    renderWithRouter(<App />);

    pokemons.forEach(({ type }) => {
      const filterButton = screen.getByRole('button', { name: type });
      expect(filterButton).toBeInTheDocument();

      userEvent.click(filterButton);

      const filteredPokemon = screen.getByTestId('pokemon-type');
      expect(filteredPokemon).toHaveTextContent(type);
    });
  });

  test('the button all', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    // Resolvido com as dicas do Zambelli no plantão
    pokemons.forEach(({ name }) => {
      const pokemonRendered = screen.getByText(name);
      expect(pokemonRendered).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
});
