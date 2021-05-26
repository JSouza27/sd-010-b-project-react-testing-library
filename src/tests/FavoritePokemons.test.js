import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testando o componente FavoritePokemons.js ', () => {
  test('Testando mensagem para nenhum pokemon favoritado', () => {
    const { getByText } = render(<FavoritePokemons />);
    const pokemonNotFound = getByText('No favorite pokemon found');
    expect(pokemonNotFound).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const history = createMemoryHistory();
    const { getAllByText } = render(
      <Router history={ history }>
        <FavoritePokemons pokemons={ pokemons } />
      </Router>,
    );

    const poke = getAllByText('More details');
    expect(poke.length).toBe(pokemons.length);
  });

  test('Nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <FavoritePokemons pokemons={ [] } />
      </Router>,
    );

    const poke = getByText('No favorite pokemon found');
    console.log();
    expect(poke).toBeInTheDocument();
  });
});
