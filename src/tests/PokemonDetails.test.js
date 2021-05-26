import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const getPikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu');
const { name, summary } = getPikachu[0];

describe('testing component PokemonsDetails.js', () => {
  test('shows infos pokemon in page details', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const textDatails = getByText(`${name} Details`);
    expect(textDatails).toBeInTheDocument();
    // const linkDetails = getByRole('link', { name: 'More details' });
    const summaryDetails = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryDetails).toBeInTheDocument();
    expect(getByText(`${summary}`)).toBeInTheDocument();
  });
});
