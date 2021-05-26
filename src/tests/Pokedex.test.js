import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const MAX_LENGTH = pokemons.length;
const ID_BTN_NEXT = 'next-pokemon';
const ID_POKEMON_NAME = 'pokemon-name';

describe('testing component Pokedex.js', () => {
  test('if contain text \'Encountered pokémons\' in Pokédex', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedex = getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(pokedex).toBeInTheDocument();
  });

  test('button \'próximo pokémon\'', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonNext = getByTestId(ID_BTN_NEXT);
    expect(buttonNext).toHaveTextContent(/próximo pokémon/i);
    fireEvent.click(buttonNext);
  });

  test('shows pokémons when click next button', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonNext = getByTestId(ID_BTN_NEXT);
    const pokémon = getByTestId(ID_POKEMON_NAME);
    expect(pokémon).toHaveTextContent('Pikachu');
    // clicar 8 vezes
    for (let i = 0; i < MAX_LENGTH - 1; i += 1) {
      fireEvent.click(buttonNext);
    }
    expect(pokémon).toHaveTextContent('Dragonair');
    fireEvent.click(buttonNext);
    expect(pokémon).toHaveTextContent('Pikachu');
  });

  test('buttons filter', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const buttonFilter = getByRole('button', { name: /psychic/i });
    fireEvent.click(buttonFilter);
    const pokémon = getByTestId(ID_POKEMON_NAME);
    expect(pokémon).toHaveTextContent('Alakazam');
    const buttonNext = getByTestId(ID_BTN_NEXT);
    fireEvent.click(buttonNext);
    expect(pokémon).toHaveTextContent('Mew');
  });

  test('button reset filter \'All\'', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: /all/i });
    fireEvent.click(buttonAll);
    const pokémon = getByTestId(ID_POKEMON_NAME);
    expect(pokémon).toHaveTextContent('Pikachu');
  });

  test('shows buttons filter by type', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const allButtons = getAllByTestId('pokemon-type-button');
    const buttonAll = getByRole('button', { name: /all/i });
    const types = [];
    pokemons.filter((pokemon) => (
      types.includes(pokemon.type) ? null : types.push(pokemon.type)
    ));
    expect(allButtons.length).toBe(types.length);
    expect(buttonAll).toBeInTheDocument();
  });
});
