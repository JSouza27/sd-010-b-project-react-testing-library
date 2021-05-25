import React from 'react';
import App from '../App';
import renderWithRoute from './renderWithRoute';

test('Testando descrição do pokemon', () => {
  const { getByText, getByAltText, getAllByText } = renderWithRoute(<App />);

  const namePokemon = getByText('Pikachu');
  const typePokemon = getAllByText('Electric');
  const img = getByAltText('Pikachu sprite');

  expect(namePokemon).toHaveTextContent('Pikachu');
  expect(typePokemon[0]).toHaveTextContent('Electric');
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(img).toHaveAttribute('alt', 'Pikachu sprite');
});
