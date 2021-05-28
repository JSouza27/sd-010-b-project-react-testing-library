import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('renders a reading with the text `No favorite pokemon found`', () => {
  const { getByText } = render(
    <FavoritePokemons pokemons={ [] } />,
  );
  const noPokemon = getByText(/No favorite pokemon found/i);
  expect(noPokemon).toBeInTheDocument();
});

test('shows the lenght of the list of favorite pokemons', () => {
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
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
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
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Alola Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 4',
          map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
        },
        {
          location: 'Kanto Rock Tunnel',
          map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
        },
      ],
    },
    {
      id: 10,
      name: 'Caterpie',
      type: 'Bug',
      averageWeight: {
        value: '2.9',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Johto Route 30',
          map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
        },
        {
          location: 'Johto Route 31',
          map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
        },
        {
          location: 'Ilex Forest',
          map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
        },
        {
          location: 'Johto National Park',
          map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
        },
      ],
    },
  ];

  const { getAllByTestId } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ pokemons } />
    </MemoryRouter>,
  );
  const favoritePokemons = 3;
  expect(getAllByTestId('pokemon-name')).toHaveLength(favoritePokemons);
});

test('shows if no pokemon is rendered if there are no favorites', () => {
  const { queryByTestId } = render(
    <FavoritePokemons pokemons={ [] } />,
  );
  expect(queryByTestId('pokemon-name')).toBe(null);
});
