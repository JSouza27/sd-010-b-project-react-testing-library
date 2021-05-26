import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';
import pokemonsList from '../data';

const typesPokemons = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

const nameButton = /Próximo pokémon/i;
const nameId = 'pokemon-name';

describe('Test the component Pokedex', () => {
  test('renders a heading with "Encountered pokémons" ', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders a button with text "Próximo pokémon" ', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('button', {
      name: nameButton,
    }));
  });

  test('renders the next pokemon until last pokemon in list, then restart', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const button = getByRole('button', {
      name: nameButton,
    });
    const pokemon = getByTestId(nameId);

    for (let index = 0; index < pokemonsList.length; index += 1) {
      fireEvent.click(button);
    }

    expect(pokemon.textContent).toBe(pokemonsList[0].name);
  });

  test('renders the next pokemons of the list , one after the other', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const button = getByRole('button', {
      name: nameButton,
    });
    const pokemon = getByTestId(nameId);

    fireEvent.click(button);

    expect(pokemon.textContent).toBe('Charmander');
  });

  test('renders one pokemon for time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const pokemon = getAllByTestId(nameId);
    expect(pokemon.length).toBe(1);
  });

  test('renders a button to reset the filter', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const pokemon = getByTestId(nameId);
    const resetButton = getByRole('button', {
      name: 'All',
    });

    fireEvent.click(resetButton);

    expect(resetButton).toBeInTheDocument();
    expect(pokemon.textContent).toBe('Pikachu');
  });

  test('the text of button must to have the name of type', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const allButtons = getAllByTestId('pokemon-type-button');

    allButtons.forEach((buttons, index) => {
      expect(buttons.textContent).toBe(typesPokemons[index]);
    });
  });
});
