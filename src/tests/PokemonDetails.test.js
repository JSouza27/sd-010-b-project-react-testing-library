import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
// import { PokemonDetails } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações do Pokémon selecionado são mostradas.', () => {});
  const { getByRole, getByText } = renderWithRouter(<App />);
  const details = /More details/i;
  const { name } = pokemons[0];
  fireEvent.click(getByText(details));
  const heading = getByRole('heading', {
    level: 2,
    name: `${name} Details`,
  });
  expect(heading).toBeInTheDocument();
  expect(getByRole('heading', {
    level: 2,
    name: /Summary/i,
  })).toBeInTheDocument();
  expect(getByRole('heading', {
    level: 2,
    name: `Game Locations of ${name}`,
  })).toBeInTheDocument();

  test('Testa se não há um link de navegação para os detalhes do Pokémon.', () => {
    const { queryByText } = renderWithRouter(<App />);
    // const details = /More details/i;
    fireEvent.click(queryByText(details));
    expect(queryByText(details)).toBeNull();
  });

  test('Testa se há uma seção com os mapas contendo as localizações do pokémon', () => {

  });
});
