import React from 'react';
// import Pokedex from '../components/Pokedex';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import pokemons from '../data';
import App from '../App';

describe('Requirement 5', () => {
  test('There is a <h2> with text `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = 'Encountered pokémons';
    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toHaveTextContent(h2);
  });

  test('Show up the next pokémon when click the button', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const pokemon = getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });

  test('Shows the first pokémon on the list, if it`s on the last', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText('Próximo pokémon');
    const clicked = 9;
    for (let clicks = 0; clicks < clicked; clicks += 1) {
      userEvent.click(button);
    }
    const first = getByText('Pikachu');
    expect(first).toBeInTheDocument();
  });
});
