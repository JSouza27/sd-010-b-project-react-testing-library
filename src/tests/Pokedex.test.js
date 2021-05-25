import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderRouter from './renderWithRoute';
import pokemons from '../data';

import App from '../App';

describe('Teste da página Pokédex', () => {
  test('Teste se página contém um heading', () => {
    renderRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(pokedexTitle).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista', () => {
    renderRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(pokemonName).toHaveTextContent('Pikachu');

    userEvent.click(nextButton);

    expect(pokemonName).toHaveTextContent('Charmander');

    for (let i = 0; i < pokemons.length - 1; i += 1) {
      userEvent.click(nextButton);
    }

    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderRouter(<App />);

    const typeButton = screen.getByRole('button', {
      name: /fire/i,
    });

    const typePokemon = screen.getByTestId('pokemon-type');

    userEvent.click(typeButton);

    expect(typePokemon).toHaveTextContent('Fire');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderRouter(<App />);

    const typeButton = screen.getByRole('button', {
      name: 'All',
    });

    expect(typeButton).toBeInTheDocument();
  });
  test('Teste se é criado, um botão de filtro para cada tipo de Pokémon', () => {
    renderRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    const types = pokemons.map((pokemon) => pokemon.type);

    // https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/#:~:text=1)%20Remove%20duplicates%20from%20an%20array%20using%20a%20Set&text=To%20remove%20duplicates%20from%20an%20array%3A,set%20back%20to%20an%20array.
    const uniqueTypes = [...new Set(types)];

    expect(typeButtons.length).toBe(uniqueTypes.length);

    const allTypeButton = screen.getByRole('button', {
      name: 'All',
    });

    expect(allTypeButton).toBeVisible();
  });
});
