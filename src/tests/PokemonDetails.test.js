import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import data from '../data';

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
    summary: `This intelligent Pokémon roasts hard berries with electricity 
to make them tender enough to eat.`,
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

const DATA = data[0].summary;
const TEXT_STRING = pokemons[0].summary.replace(/(\r\n|\n|\r)/gm, '');

describe('Name of the group', () => {
  it('test if the info of the pokemon selected are rendered', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);

    expect(getByText(`${pokemons[0].name} Details`));

    const h2Summary = getByRole('heading', { level: 2, name: 'Summary' });
    expect(h2Summary).toBeInTheDocument();
    expect(h2Summary.innerHTML).toBe('Summary');

    const detailsText = getByText(DATA);
    expect(detailsText).toBeInTheDocument();
    expect(detailsText.innerHTML).toBe(TEXT_STRING);
  });

  it('test if the page have a section for maps of the locations of pokemon', () => {
    const { getByRole, getByText, getAllByAltText, history } = renderWithRouter(<App />);
    const pikachu = pokemons[0];
    history.push(`/pokemons/${pikachu.id}`);

    expect(getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pikachu.name}`,
    }));

    expect(getByText(pikachu.foundAt[0].location)).toBeInTheDocument();
    expect(getByText(pikachu.foundAt[1].location)).toBeInTheDocument();
    const pikachuLocation = getAllByAltText('Pikachu location');

    expect(pikachuLocation[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocation[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('test if this pokemon can be favorited', () => {
    const { getByRole, getByLabelText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);

    const checkFav = getByRole('checkbox');
    expect(checkFav).toBeInTheDocument();

    fireEvent.click(checkFav);
    expect(checkFav.checked).toBe(true);

    fireEvent.click(checkFav);
    expect(checkFav.checked).toBe(false);

    expect(getByLabelText(/Pokémon Favoritado?/i)).toBeInTheDocument();
  });
});
