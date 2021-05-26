import React from 'react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('tests the pokedex component', () => {
  it('tests if the page has an h2 with the right text', () => {
    const isFavorite = pokemons.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {});
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);
    const enconunteredPokemons = getByText(/Encountered pokémons/i);
    expect(enconunteredPokemons).toBeInTheDocument();
    expect(enconunteredPokemons.nodeName).toBe('H2');
  });
});
