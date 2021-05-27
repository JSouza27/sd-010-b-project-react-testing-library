import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

test('Test if "No favorite pokemon found", when you have no favorite pokemon', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);

  const favoriteText = getByText(/No favorite pokemon found/i);

  expect(favoriteText).toBeInTheDocument();
});

test('test if card is displayed', () => {
  const { getByRole, getAllByRole } = renderWithRouter(<App />);

  const linkMoreDetailsHome = getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(linkMoreDetailsHome);

  const checkPokemonFavorite = getByRole('checkbox');
  userEvent.click(checkPokemonFavorite);

  const linkFavoritePokemons = getByRole('link', {
    name: /favorite pokémons/i,
  });
  userEvent.click(linkFavoritePokemons);

  const imgFavoriteStar = getAllByRole('img');

  expect(imgFavoriteStar[1]).toHaveAttribute('src', '/star-icon.svg');
});

test('test if no card is displayed', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);

  const noFavoriteText = getByText(/No favorite pokemon found/i);

  expect(noFavoriteText).toBeInTheDocument();
});
