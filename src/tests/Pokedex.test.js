import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Checks Pokedex', () => {
  const isPokemonFavoriteById = {};

  it('Test if the page contains "h2" with the text "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const subtitle = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(subtitle).toBeInTheDocument();
  });

  it('Test shows the next Pokémon when the button "Próximo Pokemon" is clicked.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const buttonNextPokemon = screen.getByRole('button', {
      name: 'Próximo pokémon' });

    pokemons.forEach(() => {
      fireEvent.click(buttonNextPokemon);
    });

    expect(pokemonName.textContent).toEqual(pokemons[0].name);
  });

  it('Test if only one Pokémon is shown at a time.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon[0]).toBeInTheDocument();
    expect(pokemon.length).toEqual(1);

    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    fireEvent.click(buttonNextPokemon);
    expect(pokemon[0]).toBeInTheDocument();
    expect(pokemon.length).toEqual(1);
  });

  it('Test if the Pokédex has the filter buttons.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();

    const filterFireButton = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(filterFireButton).toBeInTheDocument();

    fireEvent.click(filterFireButton);

    const firstFilteredPokemon = screen.getByText('Charmander');
    expect(firstFilteredPokemon).toBeInTheDocument();

    const buttonNextPokemon = screen.getByRole('button', {
      name: 'Próximo pokémon' });

    fireEvent.click(buttonNextPokemon);

    const secondFilteredPokemon = screen.getByText('Rapidash');
    expect(secondFilteredPokemon).toBeInTheDocument();
  });

  it('Test if the button text match the type name and are created dynamically ;', () => {
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });

    filterButtons.forEach((element, index) => {
      expect(element.textContent).toBe(types[index]);
      expect(resetButton).toBeInTheDocument();
    });
  });

  it('Test if the Pokédex contains a button to reset the filter', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });

    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
