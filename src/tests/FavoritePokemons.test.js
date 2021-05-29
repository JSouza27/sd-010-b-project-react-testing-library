import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('show if messege appears when no pokemon is favorite', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  spyOn(localStorage, 'setItem');
  localStorage.setItem('favoritePokemons', []);

  const nonePokemon = getByText('No favorite pokemon found');

  expect(nonePokemon).toBeInTheDocument();
});
