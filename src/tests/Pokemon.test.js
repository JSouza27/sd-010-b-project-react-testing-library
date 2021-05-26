import React from 'react';
import { screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './RenderWithRouter';

describe('check if the application page renders a pokemon card', () => {
  test('The correct name must be displayed', () => {
    renderWithRouter(<Pokemon />);

    const pokeName = screen.getAllByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
  });

  test('The correct type must be displayed', () => {
    renderWithRouter(<Pokemon />);

    const pokeType = screen.getAllByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
  });

  test('The correct average weight must be displayed', () => {
    renderWithRouter(<Pokemon />);

    const pokeWeight = screen.getAllByTestId('pokemon-type');
    expect(pokeWeight).toBeInTheDocument();
  });

  test('An image must be displayed', () => {
    renderWithRouter(<Pokemon />);

    const pokeImage = screen.getByAltText(/sprite/i);
    expect(pokeImage).toBeInTheDocument();
  });
});
