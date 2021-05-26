import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderRouter from './renderWithRoute';

import App from '../App';
import pokemons from '../data';

const { averageWeight } = pokemons[0];

describe('Teste dos cards dos Pokémons', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name').textContent;
    const pokeType = screen.getByTestId('pokemon-type').textContent;
    const pokeWeight = screen.getByTestId('pokemon-weight').textContent;
    const pokeImg = screen.getByRole('img').src;

    expect(pokeName).toBe(pokemons[0].name);
    expect(pokeType).toBe(pokemons[0].type);
    expect(pokeWeight).toBe(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pokeImg).toBe(pokemons[0].image);
  });
});
