import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';

import App from '../App';
import pokemons from '../data';

describe('test component PokemonDetails', () => {
  test('if page contais title "pokemon name" details', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const { name } = pokemons[0];
    const pageTitle = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    expect(pageTitle).toBeInTheDocument();
  });

  test('if link more detais is not render in the details, page', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    expect(moreDetailsButton).not.toBeInTheDocument();
  });
  test('Summary heading and text', () => {
    renderWithRouter(<App />);

    const { summary } = pokemons[0];

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const pageTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(pageTitle).toBeInTheDocument();

    const pokemonText = screen.getByText(summary);
    expect(pokemonText).toBeInTheDocument();
  });

  test('Section Game Locations', () => {
    renderWithRouter(<App />);

    const { name, foundAt } = pokemons[0];

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const pageTitle = screen.getByRole('heading', {
      level: 2, name: `Game Locations of ${name}`,
    });
    expect(pageTitle).toBeInTheDocument();

    const maps = screen.getAllByAltText(`${name} location`);
    foundAt.forEach(({ map, location }, index) => {
      const locationText = screen.getByText(location);
      expect(locationText).toBeInTheDocument();
      expect(maps[index]).toHaveAttribute('src', map);
    });
  });

  test('favorite pokemon checkbox', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const favorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favorite).toBeInTheDocument();
  });
});
