import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const pokemonNames = pokemons.map((elem) => elem.name);

describe('Renders Pokédex page', () => {
  it('render a heading with text "Encontered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Encountered pokémons');
  });

  it('renders the next pokemon when nextButton is clicked', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const nextBtn = getByTestId('next-pokemon');

    expect(nextBtn).toHaveTextContent('Próximo pokémon');
  });

  it('renders the pokemons, one by one', () => {
    const { getByTestId } = renderWithRouter(<App />);

    pokemonNames.forEach((elem) => {
      const currPokemon = getByTestId('pokemon-name');

      expect(elem).toBe(currPokemon.textContent);
      userEvent.click(getByTestId('next-pokemon'));
    });
  });
});
