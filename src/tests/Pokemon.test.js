import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test(`Teste se é renderizado um card com as informações de determinado
  pokémon.`, () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ pokemons[7] } />);
    const name = screen.getByText(pokemons[7].name);
    const type = screen.getByText(pokemons[7].type);
    const { averageWeight: { value, measurementUnit } } = pokemons[7];
    const text = `Average weight: ${value} ${measurementUnit}`;
    const info = screen.getByText(text);
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(info).toBeInTheDocument();
  });
});
