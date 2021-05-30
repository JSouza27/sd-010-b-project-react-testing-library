import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const mensagem = getByText(/No favorite pokemon found/i);
  expect(mensagem).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ pokemons } />
    </MemoryRouter>,
  );
  const pokemonId = getAllByTestId('pokemon-name');
  expect(pokemonId.length).not.toBe(0);
});
