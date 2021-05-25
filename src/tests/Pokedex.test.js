import React from 'react';
import { getByRole, getByTestId, screen } from '@testing-library/react';
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
});
