import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing Pokedex.js', () => {
  it('Verifies if have a h2 text with "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encounteredPokemons = getByRole('heading', {
      level: 2,
      name: /encountered pok[eé]mons/i,
    });

    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Verifies if when clicking at "Próximo pokémon" button, changes pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText('Próximo pokémon');
    expect(nextButton.type).toBe('button');

    const CURRENT_POKEMON = 'Pikachu';
    const NEXT_POKEMON = 'Charmander';

    expect(getByText(CURRENT_POKEMON)).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(getByText(NEXT_POKEMON)).toBeInTheDocument();
  });

  it('Verifies if when passes through all pokemons, returns to Pikachu', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText('Próximo pokémon');
    expect(nextButton.type).toBe('button');

    const POKEMON_AMOUNT = 9;
    let currAmount = POKEMON_AMOUNT;
    while (currAmount !== 0) {
      userEvent.click(nextButton);
      currAmount -= 1;
    }

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Verifies if shows up only one pokemon', () => {
    const { getAllByText } = renderWithRouter(<App />);
    // Must have only one 'More details'
    const moreDetails = getAllByText('More details');
    expect(moreDetails.length).toBe(1);
  });
});
