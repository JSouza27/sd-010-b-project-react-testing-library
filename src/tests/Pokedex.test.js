import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import allPokemons from '../data';
import App from '../App';

describe('if the page contains info about pokédex', () => {
  test('test if it contains an h2 on the page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const text = getByRole('heading', {
      level: 2,
      name: /^Encountered pokémons$/i,
    });
    expect(text).toBeInTheDocument();
  });

  describe('Test whether the next Pokémon is displayed when the button is clicked',
    () => {
      test('The button should contain the text "Next pokémon"', () => {
        const { getByRole } = renderWithRouter(<App />);
        const getButton = getByRole('button', {
          name: /^próximo pokémon$/i,
        });
        expect(getButton).toBeInTheDocument();
      });
      test('When clicking on the button, show next pokemon', () => {
        const { getByRole, getByText } = renderWithRouter(<App />);
        const firstPokemon = getByText(/^pikachu$/i);
        const getButton = getByRole('button', {
          name: /^próximo pokémon$/i,
        });
        userEvent.click(getButton);
        expect(firstPokemon.textContent).toBe('Charmander');
      });
      test('if it is the last pokemon, show the first again', () => {
        const { getByRole, getByText } = renderWithRouter(<App />);
        const firstPokemon = getByText(/^pikachu$/i);
        const getButton = getByRole('button', {
          name: /^próximo pokémon$/i,
        });
        for (let index = 0; index < allPokemons.length; index += 1) {
          userEvent.click(getButton);
        }
        expect(firstPokemon.textContent).toBe(allPokemons[0].name);
      });
      test('Test if only one Pokémon is shown at a time', () => {
        const { getAllByTestId } = renderWithRouter(<App />);
        const getNamePokemon = getAllByTestId('pokemon-name');
        expect(getNamePokemon.length).toBe(1);
      });
    });
  describe('Test if the Pokédex has the filter buttons', () => {
    test('there are filter buttons', () => {
      const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
      const { getAllByTestId } = renderWithRouter(<App />);
      const buttonsTypes = getAllByTestId('pokemon-type-button');
      expect(types.length).toBe(buttonsTypes.length);
    });
  });
});
