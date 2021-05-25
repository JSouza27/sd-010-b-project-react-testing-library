// test('', () => {});
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

// import Pokedex from '../components/Pokedex';
// import pokemons from '../data';
import App from '../App';

describe('Tests the Pokedex component', () => {
  it('tests if the page cotains a heading h2', async () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });
});

describe('Tests the button component', () => {
  it('tests if the next pokemon apears in display', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const firstPokemon = getByText('Pikachu');
    const buttonNext = getByRole('button', { name: 'Próximo pokémon' });
    expect(firstPokemon).toBeInTheDocument();
    userEvent.click(buttonNext);
  });
});
// Ver a possibilidade de usar um test.each ooou um map pra alternar entre a lista de pokemons e o evento de click
