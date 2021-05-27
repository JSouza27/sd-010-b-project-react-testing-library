import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import PokemonDetails from '../components/PokemonDetails';

describe('Check if the pokemon info are displayed', () => {
  test('The page must have a text called Details', () => {
    renderWithRouter(<PokemonDetails isFavoritebyId />);

    const pokeName = screen.getByText(/details/i);
    expect(pokeName).toBeInTheDocument();
  });

  test('The page must not have a link do Pokemon details', () => {
    renderWithRouter(<PokemonDetails
      isFavoritebyId
    />);

    const pokeDetails = screen.getByRole('link', {
      name: /details/i,
    });
    expect(pokeDetails).not.toBeInTheDocument();
  });

  test('The page must have a h2 with the text Summary', () => {
    renderWithRouter(<PokemonDetails isFavoritebyId />);

    const pokeHeading2 = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(pokeHeading2).toBeInTheDocument();
  });

  test('The page must have a paragraph with a ', () => {
    const { container } = renderWithRouter(<PokemonDetails isFavoritebyId />);
    const paragraph = container.querySelector('p');

    expect(paragraph.length).toBeInTheDocument();
  });
});
