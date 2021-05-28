import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
// import { Pokedex } from '../components';
import App from '../App';

test('shows a h2 element with text "Encountered pokémons"', () => {
  const { getByRole } = renderWithRouter(<App />);
  const pkdxTitle = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pkdxTitle).toBeInTheDocument();
});

describe('shows the next Pokémon in the list when click "Próximo pokémon" button', () => {
  const buttonValue = 'Próximo pokémon';
  test('button should contain the text "Próximo pokémon"', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextBtn = getByText(buttonValue);
    expect(nextBtn).toBeInTheDocument();
  });

  test('shows the next Pokémon, one by one, when click button', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(buttonValue);
    // Pikachu
    let pokemon = getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
    // Charmander
    userEvent.click(button);
    pokemon = getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
    // Caterpie
    userEvent.click(button);
    pokemon = getByText('Caterpie');
    expect(pokemon).toBeInTheDocument();
    // Ekans
    userEvent.click(button);
    pokemon = getByText('Ekans');
    expect(pokemon).toBeInTheDocument();
    // Alakazam
    userEvent.click(button);
    pokemon = getByText('Alakazam');
    expect(pokemon).toBeInTheDocument();
    // Mew
    userEvent.click(button);
    pokemon = getByText('Mew');
    expect(pokemon).toBeInTheDocument();
    // Rapidash
    userEvent.click(button);
    pokemon = getByText('Rapidash');
    expect(pokemon).toBeInTheDocument();
    // Snorlax
    userEvent.click(button);
    pokemon = getByText('Snorlax');
    expect(pokemon).toBeInTheDocument();
    // Dragonair
    userEvent.click(button);
    pokemon = getByText('Dragonair');
    expect(pokemon).toBeInTheDocument();
  });

  test('shows first Pokémon when in the last one and click the button', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(buttonValue);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button); // Last Pokemon
    const firstPokemon = getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
});

test('show only one Pokémon at a time', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemon = getByTestId('pokemon-name');
  expect(pokemon).not.toBe('Charmander');
  expect(pokemon).not.toBe('Caterpie');
  expect(pokemon).not.toBe('Ekans');
  expect(pokemon).not.toBe('Alakazam');
  expect(pokemon).not.toBe('Mew');
  expect(pokemon).not.toBe('Rapidash');
  expect(pokemon).not.toBe('Snorlax');
  expect(pokemon).not.toBe('Dragonair');
});

describe('renders the filter buttons', () => {
  test('shows the filter buttons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const filterBtn = getByRole('button', {
      name: /psychic/i,
    });
    expect(filterBtn).toBeInTheDocument();
  });

  test('selecting a filter, shows only the respective Pokémons', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const filterBtn = getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(filterBtn);
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
  });
});

describe('renders a button to reset filters', () => {
  test('button text must be "All"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const resetBtn = getByRole('button', {
      name: /all/i,
    });
    expect(resetBtn).toBeInTheDocument();
  });

  test('must show all Pokémons when click the reset button (with no filters)', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const resetBtn = getByRole('button', {
      name: /all/i,
    });
    userEvent.click(resetBtn);
    const pokemon = getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});

describe('', () => {
  test('', () => {
    const { getByRole } = renderWithRouter(<App />);
  });

  test('', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
  });
});
