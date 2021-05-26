import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Test favorite pokémons page', () => {
  test('render no favorite pokemons found text', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });
});
