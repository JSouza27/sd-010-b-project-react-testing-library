import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

describe('routes', () => {
  test('Shows a message when there`s no favorited pokémons', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    const heading = getByText('No favorite pokemon found');
    expect(heading).toBeInTheDocument();
  });

  test('Shows all favorited pokemons', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      // console.log(pokemonName);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});
