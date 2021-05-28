import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

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
    summary: 'This intelligent Pokémon roasts hard berries with electricity.',
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
    summary: 'The flame on its tail shows the strength of its life force.',
  },
];

global.fetch(jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue(pokemons),
}));

describe('Tests for pokemon component', () => {
  it('test the render of poke card with info', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<App />);
    const imgPokeCard = getByAltText(`${pokemons[0].name} sprite`);
    const pokeWeigth = `${pokemons[0].averageWeight.value}`;
    const pokeWeigthUnit = `${pokemons[0].averageWeight.measurementUnit}`;

    expect(getByTestId('pokemon-name').innerHTML).toBe(pokemons[0].name); // ok
    expect(getByTestId('pokemon-type').innerHTML).toBe(pokemons[0].type);
    expect(
      getByTestId('pokemon-weight').innerHTML,
    ).toBe(`Average weight: ${pokeWeigth} ${pokeWeigthUnit}`);
    expect(imgPokeCard).toBeInTheDocument(); // ok
  });

  it('test if the card have a lick to details of pokemon', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const moreDetails = getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    fireEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('test if have a img of a star in fav pokemons', () => {
    const { getByRole, getByAltText, history } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);

    const imgPokemon = getByAltText('Pikachu sprite');
    const btnFav = getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(btnFav).toBeInTheDocument();
    expect(btnFav.checked).toBe(false);

    fireEvent.click(btnFav);
    expect(btnFav.checked).toBe(true);

    const star = getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
  });
});
