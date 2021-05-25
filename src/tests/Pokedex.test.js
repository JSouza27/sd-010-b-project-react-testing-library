// import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing component Pokedex.js', () => {
  test('if contain text \'Encountered pokémons\' in Pokédex', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedex = getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(pokedex).toBeInTheDocument();
  });
  test('button \'próximo pokémon\'', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const button = getByTestId('next-pokemon');
    expect(button).toHaveTextContent(/próximo pokémon/i);
  });
});
