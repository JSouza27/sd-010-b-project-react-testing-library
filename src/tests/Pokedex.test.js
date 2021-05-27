import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Pokedex from '../components/Pokedex';
import Data from '../data';

test('check is there is a heading h2', () => {
  renderWithRouter(<Pokedex
    pokemon={ Data[0] }
    isFavorite={ [Data[0].id] }
    pokemons={ Data }
    isPokemonFavoriteById={ Data[0].id }
  />);

  const message = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(message).toBeInTheDocument();
});

test('check is there is a next Pokemon button', () => {
  renderWithRouter(<Pokedex
    pokemon={ Data[0] }
    isFavorite={ [Data[0].id] }
    pokemons={ Data }
    isPokemonFavoriteById={ Data[0].id }
  />);

  const nextPokemon = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });
  userEvent.click(nextPokemon);
});

test('check if the first pokemon is shown after the last one', () => {
  renderWithRouter(<Pokedex
    pokemon={ Data[0] }
    isFavorite={ [Data[0].id] }
    pokemons={ Data }
    isPokemonFavoriteById={ Data[0].id }
  />);

  const nextPokemon = screen.getByRole('button', {
    name: '',
  });
  userEvent.click(nextPokemon);
});
