import React from 'react';
import { fireEvent } from '@testing-library/react';

import pokemons from '../data';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente "Pokedex"', () => {
  test('Verifica se há a mensagem "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);

    const encounteredPokemons = getByRole('heading', {
      level: 2,
      name: /Encountered Pokémons/i,
    });

    expect(encounteredPokemons).toBeInTheDocument();
  });

  test('Verifica se, ao clicar no botão, o próximo Pokémon é exibido', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);

    const nextButton = getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(nextButton).toBeInTheDocument();
  });

  test('Verifica se o botão "All" existe', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);

    const allButton = getByRole('button', {
      name: 'All',
    });

    expect(allButton).toBeInTheDocument();
  });

  test('Verifica a existência de ao menos um botão selecionador de tipo', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);

    const electricButton = getByRole('button', {
      name: 'Electric',
    });

    expect(electricButton).toBeInTheDocument();
  });

  test('Verifica se o botão "All" funciona corretamente', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);

    const allButton = getByRole('button', {
      name: 'All',
    });
    const nextButton = getByRole('button', {
      name: 'Próximo pokémon',
    });
    const typeSelectorButton = getAllByTestId('pokemon-type-button')[0];

    fireEvent.click(typeSelectorButton);
    fireEvent.click(allButton);
    fireEvent.click(nextButton);

    const charmander = getByText('Charmander');

    expect(charmander).toBeInTheDocument();
  });
});
