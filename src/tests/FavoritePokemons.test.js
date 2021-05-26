import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

test('Teste se a pessoa não tiver pokémons favoritos', () => {
  renderWithRouter(<FavoritePokemons />);
  const textNoFavorite = screen.getByText(/No favorite pokemon found/i);
  expect(textNoFavorite).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  // É possivel receber props dentro do teste?
  // renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  // expect(pokemons.length).toBe(pokemonCard.length);
  renderWithRouter(<App />);
  const buttonDetail = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(buttonDetail);

  const checkboxFavorite = screen.getByRole('checkbox', {
    name: /Pokémon favoritado?/i,
  });
  userEvent.click(checkboxFavorite);

  const linkFavorite = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(linkFavorite);

  const pokemonFavorite = screen.getByText(/pikachu/i);
  expect(pokemonFavorite).toBeInTheDocument();
});
