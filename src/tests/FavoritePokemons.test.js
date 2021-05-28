import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

test('Testando o pokemon favorito', () => {
  const { container } = render(
    <BrowserRouter>
      <FavoritePokemons pokemons={ [data[0]] } />
    </BrowserRouter>,
  );
  const getFavorite = screen.getByText('Favorite pokémons');
  expect(getFavorite).toBeInTheDocument();
  const getByClass = container.querySelector('.favorite-pokemons');
  expect(getByClass.childElementCount).toEqual(1);
});

test('Testando se não há pokemon favorito', () => {
  render(
    <BrowserRouter>
      <FavoritePokemons />
    </BrowserRouter>,
  );
  const getNotFavorite = screen.getByText('No favorite pokemon found');
  expect(getNotFavorite).toBeInTheDocument();
});
