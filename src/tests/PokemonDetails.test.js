import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
// import { PokemonDetails } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações do Pokémon selecionado são mostradas.', () => {});
  const { getByRole, getByText } = renderWithRouter(<App />);
  const { name } = pokemons[0];
  const details = /More details/i;
  fireEvent.click(getByText(details));
  const heading = getByRole('heading', {
    level: 2,
    name: `${name} Details`,
  });
  expect(heading).toBeInTheDocument();
  expect(getByRole('heading', {
    level: 2,
    name: `Game Locations of ${name}`,
  })).toBeInTheDocument();
  expect(getByRole('heading', {
    level: 2,
    name: /Summary/i,
  })).toBeInTheDocument();
});
