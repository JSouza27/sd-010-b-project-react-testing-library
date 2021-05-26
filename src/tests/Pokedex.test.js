import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';

it('Test if the page contains an h2 heading with the text Encountered Pokémon', () => {
  const { getByText } = renderWithRouter(<Pokedex />);
  const pokedex = getByText(/Encountered pokémons/);
  expect(pokedex).toBeInTheDocument();
  const pokedexText = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokedexText).toBeInTheDocument();
});

it('Next Pokémon is displayed when the Next Pokémon button is clicked.', () => {
  // renderWithRouter(<Pokedex />);
  RenderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const pikachu = screen.getByText(/Pikachu/);
  expect(pikachu).toBeInTheDocument();
  const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/ });
  fireEvent.click(nextPokemon);
  const charmander = screen.getByText(/Charmander/);
  expect(charmander).toBeInTheDocument();
});
test('only one Pokémon is shown at a time', () => {
  RenderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const poke = screen.getAllByTestId('pokemon-name');
  expect(poke).toHaveLength(1);
  expect(poke[0]).toBeInTheDocument();
});
test('Pokédex has the filter buttons.', () => {
  // renderWithRouter(<Pokedex />);
  RenderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const btns = screen.getAllByTestId('pokemon-type-button');
  const types = 7;
  expect(btns.length).toBe(types);

  const eletric = screen.getByRole('button', { name: /Electric/ });
  const fire = screen.getByRole('button', { name: /Fire/ });
  const bug = screen.getByRole('button', { name: /Bug/ });
  const poison = screen.getByRole('button', { name: /Poison/ });
  const psy = screen.getByRole('button', { name: /Psychic/ });
  const normal = screen.getByRole('button', { name: /Normal/ });
  expect(eletric).toBeEnabled();
  expect(fire).toBeEnabled();
  expect(bug).toBeEnabled();
  expect(poison).toBeEnabled();
  expect(psy).toBeEnabled();
  expect(normal).toBeEnabled();
});
// test('', () => { });
// test('', () => { });
