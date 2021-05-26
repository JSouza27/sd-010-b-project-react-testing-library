import React from 'react';
// import { fireEvent, getAllByRole } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import data from '../data';

const notPokemos = 'No favorite pokemon found';
test('The message No favorite pokemon found is displayed on the screen.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const p = getByText(notPokemos).innerHTML;
  expect(p).toBe(notPokemos);
});

test('Test whether all your favorite Pokémon cards are displayed.', () => {
  const { getAllByText } = renderWithRouter(<FavoritePokemons pokemons={ data } />);
  const NOVE = 9;
  expect(getAllByText('More details').length).toBe(NOVE);
});

test('Test if no Pokémon card is displayed, if it is not favored.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  expect(getByText(notPokemos).innerHTML)
    .toBe(notPokemos);
});
