import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const POKEMON = {
  id: 78,
  name: 'Rapidash',
  type: 'Fire',
  averageWeight: {
    value: '95.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Route 28',
      map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
    },
    {
      location: 'Johto Mount Silver',
      map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
    },
  ],
  summary: 'At full gallop, its four hooves barely touch the ground because it moves so incredibly fast.',
};

describe('Testing Pokemon.js', () => {
  it('Verifies if the pokemon have the correct info', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite={ false }
    />);
    const pokemonName = getByText('Rapidash');
    const pokemonType = getByText('Fire');
    const averageWeight = getByText('Average weight: 95.0 kg');
    const pokemonImg = getByRole('img');
    const pokemonImgSrc = 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png';

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
    expect(pokemonImg.src).toBe(pokemonImgSrc);
  });
});
