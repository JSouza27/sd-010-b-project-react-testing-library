import React from 'react';
import favoritePokemons from '../data';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <FavoritePokemons.js />', () => {
  it('Testanto se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    expect(getByText('No favorite pokemon found')).toBeDefined();
  });

  it('Testanto se a pessoa tiver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemons }
    />);

    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
  });
});
