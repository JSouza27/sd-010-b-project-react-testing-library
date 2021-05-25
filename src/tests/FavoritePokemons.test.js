// test('', () => {});
import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Tests the Favorite Pokemons page', () => {
  it('tests the menssage No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const menssage = getByText(/No favorite pokemon found/i);
    expect(menssage).toBeInTheDocument();
  });

  // it('tests whether all favorite Pokémon cards are applied', () => {

  // });
});
