import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

// import pokemons from '../data';

describe('Test pokedex component', () => {
  test('If the page contais title "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pageTitle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pageTitle).toBeInTheDocument();
  });

  test('If the next pokemon is rendered', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Charmander');
  });
});
