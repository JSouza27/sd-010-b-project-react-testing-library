import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the pokedex', () => {
  it('test the <h2> tag "encountered pokemons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const titlePokedex = getByRole('heading', {
      level: 2,
    });
    expect(titlePokedex).toHaveTextContent('Encountered pokémons');
  });

  it('test if the pokemon changes when next button is clicked', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const nextBtn = getByRole('button', {
      name: 'Próximo pokémon',
    });
    const initialPokemonName = getByTestId('pokemon-name');

    expect(initialPokemonName).toHaveTextContent('Pikachu');

    userEvent.click(nextBtn);
    const pokemonNameAfterClick = getByTestId('pokemon-name');

    expect(pokemonNameAfterClick).toHaveTextContent('Charmander');
  });
});
