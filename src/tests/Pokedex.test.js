import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonNameString = 'pokemon-name';
const nextPokemon = 'Próximo pokémon';

test('Renders Pokedex and checks for h2', () => {
  renderWithRouter(<App />);
  const h2 = screen.getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent('Encountered pokémons');
});

// checks if button goes through all the pokemons correctly and returns to the first one
test('test button Próximo pokémon and if all pokemons are shown', () => {
  const pokemonsList = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
    'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
  renderWithRouter(<App />);
  const button = screen.getByTestId('next-pokemon');
  pokemonsList.forEach((element) => {
    const pokemonName = screen.getByTestId(pokemonNameString);
    expect(pokemonName).toHaveTextContent(element);
    userEvent.click(button);
  });
  const name = screen.getByTestId(pokemonNameString);
  expect(name).toHaveTextContent('Pikachu');
});

test('test if selecting Electric and then All shows all pokémons', () => {
  const pokemonsList = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
    'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
  renderWithRouter(<App />);
  const buttonElectric = screen.getByRole('button', { name: 'Electric' });
  const buttonAll = screen.getByRole('button', { name: 'All' });
  const buttonNext = screen.getByTestId('next-pokemon');
  userEvent.click(buttonElectric);
  userEvent.click(buttonAll);
  pokemonsList.forEach((element) => {
    const pokemonName = screen.getByTestId(pokemonNameString);
    expect(pokemonName).toHaveTextContent(element);
    userEvent.click(buttonNext);
  });
  const name = screen.getByTestId(pokemonNameString);
  expect(name).toHaveTextContent('Pikachu');
});

test('Test if there are all filter buttons', () => {
  const filters = ['Electric', 'Bug', 'Fire', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  renderWithRouter(<App />);
  filters.forEach((element) => {
    const button = screen.getByRole('button', { name: element });
    expect(button).toBeInTheDocument();
  });
});

describe('Test if each category shows only its own pokémon', () => {
  test('Electric category shows Pikachu and next button is disabled', () => {
    const electric = 'Pikachu';
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(button);
    const pokemon = screen.getByTestId(pokemonNameString);
    expect(pokemon).toHaveTextContent(electric);
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    expect(nextButton).toBeDisabled();
  });

  test('Bug category shows Caterpie and next button is disabled', () => {
    const bug = 'Caterpie';
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Bug' });
    userEvent.click(button);
    const pokemon = screen.getByTestId(pokemonNameString);
    expect(pokemon).toHaveTextContent(bug);
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    expect(nextButton).toBeDisabled();
  });

  test('Poison category shows Ekans and next button is disabled', () => {
    const poison = 'Ekans';
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Poison' });
    userEvent.click(button);
    const pokemon = screen.getByTestId(pokemonNameString);
    expect(pokemon).toHaveTextContent(poison);
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    expect(nextButton).toBeDisabled();
  });

  test('Normal category shows Snorlax and next button is disabled', () => {
    const normal = 'Snorlax';
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Normal' });
    userEvent.click(button);
    const pokemon = screen.getByTestId(pokemonNameString);
    expect(pokemon).toHaveTextContent(normal);
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    expect(nextButton).toBeDisabled();
  });

  test('Dragon category shows Dragonair and next button is disabled', () => {
    const dragon = 'Dragonair';
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Dragon' });
    userEvent.click(button);
    const pokemon = screen.getByTestId(pokemonNameString);
    expect(pokemon).toHaveTextContent(dragon);
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    expect(nextButton).toBeDisabled();
  });

  test('Fire category shows Charmander and Rapidash and next button is enabled', () => {
    const fire = ['Charmander', 'Rapidash'];
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(button);
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    expect(nextButton).toBeEnabled();
    fire.forEach((element) => {
      const pokemon = screen.getByTestId(pokemonNameString);
      expect(pokemon).toHaveTextContent(element);
      userEvent.click(nextButton);
    });
  });

  test('Fire category shows Charmander and Rapidash and next button is enabled', () => {
    const psychic = ['Alakazam', 'Mew'];
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(button);
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    expect(nextButton).toBeEnabled();
    psychic.forEach((element) => {
      const pokemon2 = screen.getByTestId(pokemonNameString);
      expect(pokemon2).toHaveTextContent(element);
      userEvent.click(nextButton);
    });
  });
});
