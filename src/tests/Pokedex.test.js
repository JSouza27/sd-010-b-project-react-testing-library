import React from 'react';
// import Pokedex from '../components/Pokedex';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const prxpkm = 'Próximo pokémon';

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
    const button = getByText(prxpkm);
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const pokemon = getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });

  test('Shows the first pokémon on the list, if it`s on the last', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(prxpkm);
    const clicked = 9;
    for (let clicks = 0; clicks < clicked; clicks += 1) {
      userEvent.click(button);
    }
    const first = getByText('Pikachu');
    expect(first).toBeInTheDocument();
  });

  test('There is filter buttons at Pokédex', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const filterButton = getAllByTestId('pokemon-type-button');
    filterButton.forEach((elem) => {
      userEvent.click(elem);
      for (let i = 0; i < pokemons.length; i += 1) {
        expect(getByTestId('pokemon-type').textContent).toBe(elem.textContent);
        userEvent.click(getByTestId('next-pokemon'));
      }
    });
  });

  // https://github.com/tryber/sd-010-b-project-react-testing-library/pull/11/files
  test('There is a reset button with the text `All`', () => {
    const { getAllByRole, getByText } = renderWithRouter(<App />);
    const button = getAllByRole('button');
    expect(button[0]).toHaveTextContent('All');

    userEvent.click(button[0]);

    const nextPokemon = getByText('Próximo pokémon');
    userEvent.click(nextPokemon);
    const next = getByText(/charmander/i);
    expect(next).toBeInTheDocument();
  });
});
