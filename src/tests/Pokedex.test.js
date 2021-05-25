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
});
