import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Test FavoritePokemons component', () => {
  it('Should return No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemon={ [] } />);
    const noPokemon = getByText('No favorite pokemon found');
    expect(noPokemon).toBeInTheDocument();
  });
});
