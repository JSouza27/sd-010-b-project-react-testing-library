import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const pokemonIds = {
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

const types = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];

describe('Testando toda a aplicação Pokedex', () => {
  it('Verificando se os elementos aparecem na tela', () => {
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokemonIds }
    />);

    const titleH2 = getByText(/Encountered pokémons/i);
    const buttonAll = getByText(/All/i);
    const buttonNext = getByText(/Próximo pokémon/i);

    expect(titleH2).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(buttonNext).toBeInTheDocument();

    types.forEach((type) => {
      const button = getByRole('button', {
        name: type,
      });
      expect(button).toBeInTheDocument();
    });
    const allButtons = getAllByTestId('pokemon-type-button');
    expect(allButtons).toHaveLength(types.length);
  });

  it('Verificando os botões de tipo de pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokemonIds }
    />);

    const psychiButton = getByRole('button', { name: /Psychic/i });
    fireEvent.click(psychiButton);
    const alakazam = getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    const nextButton = getByRole('button', { name: /Próximo Pokémon/i });
    fireEvent.click(nextButton);
    const mew = getByText('Mew');
    expect(mew).toBeInTheDocument();
    const allButton = getByRole('button', { name: /All/i });
    fireEvent.click(allButton);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
