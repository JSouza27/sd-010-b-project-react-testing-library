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
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
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

    const btnFav = getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(btnFav).toBeInTheDocument();

    fireEvent.click(btnFav);
    expect(btnFav.checked).toBe(true);

    const star = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(star).toBeInTheDocument();
  });
});
