import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('test component Pokemon', () => {
  test('tests if a pokemon card is rendered', () => {
    renderWithRouter(<App />);

    pokemons.forEach(({ name, type, averageWeight:
      { value, measurementUnit }, image }) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByRole('img');
      const moreInfoLink = screen.getByRole('link', { name: /More details/i });

      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toHaveTextContent(`${value} ${measurementUnit}`);
      // ** SOURCE https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f */
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
      expect(moreInfoLink).toBeInTheDocument();

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextButton);
    });
  });

  test('if pokemon card contains a "more information" Link', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const { id } = pokemons[0];

    const moreInfoLink = screen.getByRole('link', { name: /More details/i });
    expect(moreInfoLink).toBeInTheDocument();

    userEvent.click(moreInfoLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('if there is a favorite icon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const { name } = pokemons[0];

    const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);

    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
