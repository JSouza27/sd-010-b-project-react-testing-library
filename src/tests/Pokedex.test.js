import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import { Pokedex } from '../components';
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
  test('button should contain the text "Próximo pokémon"', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextBtn = getByText('Próximo pokémon');
    expect(nextBtn).toBeInTheDocument();
  });

  test('shows the next Pokémon, one by one, when click button', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText('Próximo pokémon');
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
    const button = getByText('Próximo pokémon');
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
