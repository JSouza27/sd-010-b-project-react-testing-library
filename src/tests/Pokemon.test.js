import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('atibutos do primerito pokemon', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);
  const namePokemon = getByTestId('pokemon-name');
  const tupePokemon = getByTestId('pokemon-type');
  const weightPokemon = getByTestId('pokemon-weight');

  expect(namePokemon.textContent).toBe('Pikachu');
  expect(tupePokemon.textContent).toBe('Electric');
  expect(weightPokemon.textContent).toBe('Average weight: 6.0 kg');

  const img = getByAltText('Pikachu sprite');
  expect(img).toBeInTheDocument();

  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('link para detalhes do pokemon', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const MoreDetails = getByText('More details');
  expect(MoreDetails).toBeInTheDocument();
  fireEvent.click(MoreDetails);
  const detalhes = getByText(/details/i);
  expect(detalhes).toBeInTheDocument();
  const summary = getByText('Summary');
  expect(summary).toBeInTheDocument();

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

it('adicionar aos favoritos', () => {
  const { getByRole, getByAltText, getByText } = renderWithRouter(<App />);

  const MoreDetails = getByText('More details');
  fireEvent.click(MoreDetails);

  const pokemonFavorite = getByText(/Pokémon favoritado/);
  expect(pokemonFavorite).toBeInTheDocument();
  fireEvent.click(pokemonFavorite);

  const textMarked = getByAltText('Pikachu is marked as favorite');
  expect(textMarked).toBeInTheDocument();
  expect(textMarked).toHaveAttribute('src', '/star-icon.svg');
});
