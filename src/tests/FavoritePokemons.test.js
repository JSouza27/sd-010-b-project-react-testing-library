import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  },
];

describe('Test "FavoritePokemons" component', () => {
  it('show message if dosen\'t have favorite pokemons', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const notFount = getByText(/no favorite pokemon found/i);

    expect(notFount).toBeInTheDocument();
  });

  it('show all favorite pokemons', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const names = getAllByTestId('pokemon-name');
    const type = getAllByTestId('pokemon-type');

    expect(names).toHaveLength(2);
    expect(type).toHaveLength(2);
  });
});
