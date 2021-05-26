// import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('testing component Pokemon.js', () => {
  test('shows card info pokémons', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name', { name: /pikachu/i });
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    const pokemonType = getByTestId('pokemon-type', { name: /electric/i });
    expect(pokemonType).toHaveTextContent(/electric/i);
    const getPikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu');
    const { averageWeight: { value, measurementUnit } } = getPikachu[0];
    const pokemonWeight = getByTestId('pokemon-weight', {
      name: `Average weight: ${value} ${measurementUnit}`,
    });
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);
  });
});
