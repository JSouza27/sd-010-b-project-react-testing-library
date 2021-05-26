// import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('testing component Pokemon.js', () => {
  test('shows card info pokémons', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const getPikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu');
    const { averageWeight, image, name, type } = getPikachu[0];
    const { value, measurementUnit } = averageWeight;
    const pokemonName = getByTestId('pokemon-name', { name: `${name}` });
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    const pokemonType = getByTestId('pokemon-type', { name: `${type}` });
    expect(pokemonType).toHaveTextContent(/electric/i);
    const pokemonWeight = getByTestId('pokemon-weight', {
      name: `Average weight: ${value} ${measurementUnit}`,
    });
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    const pokemonImage = getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', `${image}`);
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });
});
