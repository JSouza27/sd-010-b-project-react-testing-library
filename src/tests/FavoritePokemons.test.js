import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './RenderWithRouter';

test('check if a message appears when there is no favorite pokemon', () => {
  renderWithRouter(<FavoritePokemons />);

  const message = screen.getByText('No favorite pokemon found');

  expect(message).toBeInTheDocument();
});
