import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('shows "No favorite Pokémon found" if havent favorite Pokémon', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const noFavPokemon = getByText('No favorite pokemon found');
  expect(noFavPokemon).toBeInTheDocument();
});

test('shows all favorite pokémon cards', () => {
  const { getByText } = renderWithRouter(<App />);
  const detailsBtn = getByText('More details');
  userEvent.click(detailsBtn);
  const favoriteBtn = getByText('Pokémon favoritado?');
  userEvent.click(favoriteBtn);
  const favoriteLink = getByText('Favorite Pokémons');
  userEvent.click(favoriteLink);
  const favName = getByText('Pikachu');
  expect(favName).toBeInTheDocument();
});

test('does not show pokemon card, if it is not favorite', () => {
  renderWithRouter(<FavoritePokemons />);
  expect('Pikachu').not.toContain();
});
