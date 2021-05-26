import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { fireEvent, getByRole, render } from '@testing-library/react';
// import App from '../App';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

test('Exibe a mensagem No favorite pokemon found, se não tiver favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const message = 'No favorite pokemon found';
  const messageElement = getByText(message);

  expect(messageElement).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

  pokemons.forEach((pokemon) => {
    const pokeName = pokemon.name;
    const pokeNameElement = getByText(pokeName);
    expect(pokeNameElement).toBeInTheDocument();
  });
});
