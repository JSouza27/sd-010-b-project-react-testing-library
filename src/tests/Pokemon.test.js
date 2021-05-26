import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';
import pokemons from '../data';

describe('test component Pokemon', () => {
  test('tests if a pokemon card is rendered', () => {
    renderWithRouter(<App />);

    pokemons.forEach(({ name, type, averageWeight:
      { value, measurementUnit }, image }) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByRole('img');

      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toHaveTextContent(`${value} ${measurementUnit}`);
      // ** SOURCE https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f */
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextButton);
    });
  });
});
