import { render, screen } from '@testing-library/react';
import React from 'react';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';

describe('testing the `FavoritePokemons` component', () => {
  test('check if the message `No favorite pokemon found` is displayed on the screen',
    () => {
      render(<FavoritePokemons />);

      const message = 'No favorite pokemon found';

      expect(screen.getByText(message)).toBeInTheDocument();
    });

  test('check if all favorite Pokémon cards are displayed',
    () => {
      const pokemonData = [{
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      }];

      renderWithRouter(<FavoritePokemons pokemons={ pokemonData } />);

      const id = 'pokemon-weight';

      expect(screen.queryByTestId(id)).toBeInTheDocument();
    });

  test('check that no pokémon card is displayed, if it is not favored',
    () => {
      const pokemonData = [];

      renderWithRouter(<FavoritePokemons pokemons={ pokemonData } />);

      const message = 'No favorite pokemon found';

      expect(screen.getByText(message)).toBeInTheDocument();
    });
});
