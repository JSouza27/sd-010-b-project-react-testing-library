import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

it('Test if the page contains an h2 heading with the text Encountered Pokémon', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const pokedexText = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
  });
  expect(pokedexText).toBeInTheDocument();
});

it('Next Pokémon is displayed when the Next Pokémon button is clicked.', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const pikachu = screen.getByText(/Pikachu/);
  expect(pikachu).toBeInTheDocument();
  const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/ });
  fireEvent.click(nextPokemon);
  const charmander = screen.getByText(/Charmander/);
  expect(charmander).toBeInTheDocument();
});

test('only one Pokémon is shown at a time', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const pokemon = screen.getAllByTestId('pokemon-name');
  expect(pokemon).toHaveLength(1);
  expect(pokemon[0]).toBeInTheDocument();
});

test('If has the filter buttons', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const buttons = screen.getAllByTestId('pokemon-type-button');
  const types = 7;
  expect(buttons.length).toBe(types);
});

test('If contains a button to reset the filter', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const electric = screen.getByRole('button', { name: /Electric/ });
  fireEvent.click(electric);
  const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/ });
  expect(nextPokemon).toBeDisabled();

  const allButton = screen.getByRole('button', { name: /All/ });
  fireEvent.click(allButton);
  expect(nextPokemon).toBeEnabled();
});

test('Next Pokémon button should be disabled when has only one Poké in the list.', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const electric = screen.getByRole('button', { name: /Electric/ });
  fireEvent.click(electric);
  const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/ });
  expect(nextPokemon).toBeDisabled();
});
