import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('test favorite pokemons', () => {
  test('text of no favorite pokemons', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noPokemonsFound = getByText('No favorite pokemon found');
    expect(noPokemonsFound).toBeInTheDocument();
  });
});
