import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

test('Verifica se mensagem `No favorite pokemon found` aparece na tela', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const notFoundMessage = getByText('No favorite pokemon found');

  expect(notFoundMessage).toBeInTheDocument();
});

test('Verifica se é exibido os cards dos pokémons favoritados', () => {
  const { getAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

  expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
});

test('Verifica se nenhum card é exibido, se ele não estiver favoritado', () => {
  const queryAllByTestId = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

  expect(queryAllByTestId('poke-name').length).toBe(0);
});
