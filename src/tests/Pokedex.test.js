import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import data from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

test('Test if the page contains an h2 heading with the text Encountered Pokémon', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  expect(getByRole('heading').innerHTML).toBe('Encountered pokémons');
});

describe('Test if the next Pokémon in the list is'
  + ' displayed when the Next Pokémon button is clicked.', () => {
  it('The button should contain the text Next pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    expect(getByText(/Próximo pokémon/i).innerHTML).toBe('Próximo pokémon');
  });

  it('The next Pokémon in the list must be shown,'
  + ' one by one, by successively clicking on the button', () => {
    const { getByText, history } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonNext = getByText(/Próximo pokémon/i);
    data.forEach((pokemon) => {
      const namePokemon = getByText(pokemon.name);
      expect(namePokemon.innerHTML).toBe(pokemon.name);
      fireEvent.click(buttonNext);
    });
  });

  it('The first Pokémon on the list should be shown by clicking the button,'
  + ' if it is on the last Pokémon on the list', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonNext = getByText(/Próximo pokémon/i);
    data.forEach((pok) => {
      const namePokemon = getByText(pok.name);
      const condicao = namePokemon.innerHTML === 'Dragonair';
      fireEvent.click(buttonNext);
      if (condicao) expect(namePokemon.innerHTML).toBe('Pikachu');
    });
  });
});
