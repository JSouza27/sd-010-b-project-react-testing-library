import React from 'react';
// import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('Verifica se é exibido na tela o texto "No favorite pokemon found"', () => {
  const arr = [];
  const { getByText } = render(<FavoritePokemons pokemons={ arr } />);
  const texto = getByText(/No favorite pokemon found/i);
  expect(texto).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados"', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ pokemons } />
    </MemoryRouter>,
  );
  const element = getAllByTestId('pokemon-weight');
  const array = [...element];
  expect(array.length).toEqual(pokemons.length);
});
