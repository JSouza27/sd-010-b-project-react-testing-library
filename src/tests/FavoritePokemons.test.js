import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testing FavoritePokemons.js', () => {
  it('Show no pokemon if dont have a pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemon={ [] } />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
