import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe('tests the FavoritePokemons component', () => {
  it('tests if it renders a message if there is no fav pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavs = getByText('No favorite pokemon found');
    expect(noFavs).toBeInTheDocument();
  });
  it('tests if is exibhited all cards of favorites pokemons and only them', () => {
    const favPokemons = [pokemons[0], pokemons[1], pokemons[2]];
    const { getByText, getAllByRole } = renderWithRouter(<FavoritePokemons
      pokemons={ favPokemons }
    />);
    const pikachu = getByText('Pikachu');
    const charmander = getByText('Charmander');
    const caterpie = getByText('Caterpie');
    const allPokeCards = getAllByRole('img');
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
    expect(allPokeCards).toHaveLength(favPokemons.length * 2);
  });
});
