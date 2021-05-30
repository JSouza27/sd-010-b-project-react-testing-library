import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste se é renderizado um card com as informações', () => {
  test('Teste se é renderizado um card com as informações do pokémon.', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Pokemon />
      </MemoryRouter>,
    );
    pokemons.forEach(({ type, image, averageWeight: { value, measurementUnit } }));
    const pokemonName = screen.availHeightgetByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByRole('img');

    expect(pokemonName).toHaveTextContent();
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(`Average weight: ${value}${measurementUnit}`);
    expect(pokemonImage).toHaveAttribute('src', image);
  });
});
