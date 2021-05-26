import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const getPikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu');
const { name } = getPikachu[0];

describe('testing component PokemonsDetails.js', () => {
  test('shows infos pokemon in page details', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const textDatails = getByText(`${name} Details`);
    expect(textDatails).toBeInTheDocument();
  });
});
