import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test "FavoritePokemons" component', () => {
  it('Check if the page is empty', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const emptyPokemons = getByText('No favorite pokemon found');
    expect(emptyPokemons).toBeInTheDocument();
    expect(emptyPokemons).toHaveTextContent('No favorite pokemon found');
  });
});
