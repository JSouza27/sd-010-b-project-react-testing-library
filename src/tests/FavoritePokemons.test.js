import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const error = getByText('No favorite pokemon found');

    expect(error).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const pokemonsCards = getAllByTestId('pokemon-name');

    expect(pokemonsCards.length > 0);
  });
});
