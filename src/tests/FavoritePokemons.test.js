import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Test favorite pokémons page', () => {
  test('render no favorite pokemons found text', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  test('if the favorite cards render', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonCard = screen.getAllByTestId('pokemon-name');
    expect(pokemonCard.length).not.toBe(0);
  });

  test('if there is no favorite pokemons, 0 cards are rendered', () => {
    const emptyPokemonsArray = [];
    renderWithRouter(<FavoritePokemons pokemons={ emptyPokemonsArray } />);

    const pokemonCard = screen.getAllByTestId('pokemon-name');
    expect(pokemonCard).toBeNull();
  });
});
