import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRoute from './renderWithRoute';

test('Testando descrição do pokemon', () => {
  const { getByTestId, getByAltText } = renderWithRoute(<App />);

  const namePokemon = getByTestId('pokemon-name');
  const typePokemon = getByTestId('pokemon-type');
  const sizePokemon = getByTestId('pokemon-weight');
  const img = getByAltText('Pikachu sprite');

  expect(namePokemon).toHaveTextContent('Pikachu');
  expect(typePokemon).toHaveTextContent('Electric');
  expect(sizePokemon).toHaveTextContent('Average weight: 6.0 kg');
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(img).toHaveAttribute('alt', 'Pikachu sprite');
});

test('Testando o link DETAILS', () => {
  const { getByLabelText, getByText, getByAltText } = renderWithRoute(<App />);

  const link = getByText('More details');

  fireEvent.click(link);

  const pokemon = getByText('Pikachu Details');
  const favorite = getByLabelText('Pokémon favoritado?');

  fireEvent.click(favorite);

  const img = getByAltText('Pikachu is marked as favorite');

  expect(pokemon).toBeInTheDocument();
  expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  expect(img).toHaveAttribute('src', '/star-icon.svg');
});
