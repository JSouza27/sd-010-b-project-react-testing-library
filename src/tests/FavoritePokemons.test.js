import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('Testando o component Pokemon', () => {
  const { container } = render(
    <BrowserRouter>
      <FavoritePokemons />
    </BrowserRouter>,
  );

  const textPokemon = screen.getByRole('heading', {
    level: 2,
    name: /Favorite pokémons/i,
  });
  expect(textPokemon).toBeInTheDocument();

  const noFavorite = {
    case1: screen.getByText('No favorite pokemon found'),
    case2: screen.getByText('Favorite pokémons'),
  };
  const getByClass = container.querySelector('[class="favorite-pokemons"]');
  const getChildren = getByClass !== null ? getByClass.children : null;
  if (getChildren) {
    expect(noFavorite.case1).toBeInTheDocument();
  } else expect(noFavorite.case2).toBeInTheDocument();
});
