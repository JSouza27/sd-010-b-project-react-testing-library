import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('teste se Favorite pokémons existe', () => {
  const { getByText } = render(<FavoritePokemons />);
  const heading = getByText(/Favorite pokémons/i);
  expect(heading).toBeInTheDocument();
});

test('caso não tenha favoritos exibir `No favorite pokemon found`', () => {
  const { getByText } = render(<FavoritePokemons />);
  const heading = getByText(/No favorite pokemon found/i);
  expect(heading).toBeInTheDocument();
});
