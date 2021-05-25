import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Checks FavorivePokemons', () => {
  it('Checks if the page returns a message when there are no favorite pokemons', () => {
    render(<FavoritePokemons />);

    const mensage = screen.getByText('No favorite pokemon found');
    expect(mensage).toBeInTheDocument();
  });

  it('Checks if the page returns all pokémon cards', () => {
    const pokemons = data.splice(0, 2);

    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const firstPokemonName = screen.getByText('Pikachu');
    expect(firstPokemonName).toBeInTheDocument();

    const secondPokemonName = screen.getByText('Charmander');
    expect(secondPokemonName).toBeInTheDocument();
  });

  it('Checks if no Pokémon card is displayed, if it is not favored.', () => {
    const noPokemons = [];

    renderWithRouter(<FavoritePokemons pokemons={ noPokemons } />);

    const pokemon = screen.getByText('No favorite pokemon found');
    expect(pokemon).toBeInTheDocument();
  });
});
