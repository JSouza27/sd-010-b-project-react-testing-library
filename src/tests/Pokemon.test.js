import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do sexto requisito ', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    const { name } = pokemons[0];

    expect(namePokemon).toHaveTextContent(name);
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const typePokemon = screen.getByTestId('pokemon-type');
    const { type } = pokemons[0];

    expect(typePokemon).toHaveTextContent(type);
  });
});
