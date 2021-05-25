import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRoute from './renderWithRoute';

test('Testando se renderiza "No favorite pokemon found" quando não há favoritos', () => {
  const { getByText } = renderWithRoute(<FavoritePokemons />);

  const text = getByText('No favorite pokemon found');

  expect(text).toBeInTheDocument();
});

test('Testando se renderiza pokemons quando há favoritos', () => {
  const {
    getByText, getAllByRole, getByLabelText, history,
  } = renderWithRoute(<App />);

  const details = getByText('More details');

  fireEvent.click(details);

  const favorite = getByLabelText('Pokémon favoritado?');

  fireEvent.click(favorite);

  history.push('/');

  const link = getAllByRole('link');

  fireEvent.click(link[2]);

  const text = getByText('Pikachu');

  expect(text).toBeInTheDocument();
});
