import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';

const POKEMONS_TEST = [
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
    summary: '...',
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
    summary: '...',
  },
];
const FAVORITE_OBJ = { 4: false, 25: false };

describe('Testing Pokedex.js', () => {
  const NEXT_BUTTON = 'Próximo pokémon';

  it('Verifies if have a h2 text with "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encounteredPokemons = getByRole('heading', {
      level: 2,
      name: /encountered pok[eé]mons/i,
    });

    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Verifies if when clicking at "Próximo pokémon" button, changes pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(NEXT_BUTTON);
    expect(nextButton.type).toBe('button');

    const CURRENT_POKEMON = 'Pikachu';
    const NEXT_POKEMON = 'Charmander';

    expect(getByText(CURRENT_POKEMON)).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(getByText(NEXT_POKEMON)).toBeInTheDocument();
  });

  it('Verifies if when passes through all pokemons, returns to Pikachu', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(NEXT_BUTTON);
    expect(nextButton.type).toBe('button');

    const POKEMON_AMOUNT = 9;
    let currAmount = POKEMON_AMOUNT;
    while (currAmount !== 0) {
      userEvent.click(nextButton);
      currAmount -= 1;
    }

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Verifies if shows up only one pokemon', () => {
    const { getAllByText } = renderWithRouter(<App />);
    // Must have only one 'More details'
    const moreDetails = getAllByText('More details');
    expect(moreDetails.length).toBe(1);
  });

  it('Clicks in a button type and only shows up that type of pokemon', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const TYPE = 'Fire'; // Type to test
    const nextButton = getByText(NEXT_BUTTON);
    const typeButton = getByText(TYPE);
    expect(typeButton.type).toBe('button');

    userEvent.click(typeButton);
    // Must have the paragraph and button with 'Fire' text
    expect(getAllByText(TYPE).length).toBe(2);

    userEvent.click(nextButton);
    expect(getAllByText(TYPE).length).toBe(2);
  });

  it('Verifies if have all button types', () => {
    const { getByRole } = renderWithRouter(<App />);
    const TYPES = ['Electric', 'Fire', 'Psychic', 'Bug', 'Poison', 'Normal', 'Dragon'];

    TYPES.forEach((type) => {
      const buttonType = getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
    });
  });

  it('Verifies if have an "all" button', () => {
    const { getByRole } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
  });

  it('Verifies if "all" button filters all pokemons', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const allButton = getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    const nextButton = getByText(NEXT_BUTTON);
    userEvent.click(nextButton);
    expect(getByText('Charmander')).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(getByText('Caterpie')).toBeInTheDocument();
  });

  it('Starts with "All" button selected', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextButton = getByText(NEXT_BUTTON);
    userEvent.click(nextButton);
    expect(getByText('Charmander')).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(getByText('Caterpie')).toBeInTheDocument();
  });

  it('Verify if buttons are created dinamically', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ POKEMONS_TEST } isPokemonFavoriteById={ FAVORITE_OBJ } />,
    );

    const electricType = getByRole('button', { name: 'Electric' });
    const fireType = getByRole('button', { name: 'Fire' });
    const allType = getByRole('button', { name: 'All' });

    expect(electricType).toBeInTheDocument();
    expect(fireType).toBeInTheDocument();
    expect(allType).toBeInTheDocument();

    const typeButtons = getAllByTestId('pokemon-type-button');
    const MAX_TYPE_BUTTONS_NUM = 2;
    // All, Electric, Fire and Proximo Pokémon
    expect(typeButtons.length).toBe(MAX_TYPE_BUTTONS_NUM);
  });

  it('Verifies if have only one pokemon, "next button" are disabled', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const nextButton = getByText(NEXT_BUTTON);
    const electricType = getByRole('button', { name: 'Electric' });

    userEvent.click(electricType);

    expect(nextButton.disabled).toBeTruthy();
  });
});
