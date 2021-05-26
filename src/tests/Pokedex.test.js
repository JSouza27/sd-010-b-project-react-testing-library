// test('', () => {});
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Pokedex } from '../components';

describe('Tests the Pokedex component', () => {
  it('tests if the page cotains a heading h2', async () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });
});

describe('Tests the buttons on the Pokedex component', () => {
  it('tests if the next pokemon apears in display', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    let pokemonName;
    // Ver a possibilidade de usar um test.each ooou um map pra alternar entre a lista de pokemons e o evento de click
    pokemons.forEach((pokemon) => {
      pokemonName = getByText(pokemon.name);
      const buttonNext = getByRole('button', { name: 'Próximo pokémon' });
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(buttonNext);
    });
  });

  it('tests if only one Pokémon is shown at a time', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    let pokemon;
    pokemons.forEach((_pokemon, index) => {
      pokemon = getByTestId('pokemon-name');
      const firstPokemon = getByText('Pikachu');
      expect(firstPokemon).toBeInTheDocument();

      if (pokemon[index !== 0]) expect(pokemon).not.toBeInTheDocument();
    });
  });

  it('tests if the Pokédex has the filter buttons', () => {
    const { getByRole } = renderWithRouter(<App />);
    let filterBtn;
    pokemons.forEach((pokemon) => {
      filterBtn = getByRole('button', { name: pokemon.type });
      expect(filterBtn).toBeInTheDocument();
    });
  });

  it('Test if the Pokédex contains a button to reset the filter', () => {
    const isPokemonFavoriteById = {};
    pokemons.reduce((acc, poke) => {
      isPokemonFavoriteById[poke.id] = false;
      return acc;
    }, {});
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const allBtn = getByRole('button', { name: 'All' });
    userEvent.click(allBtn);
    expect(allBtn).toBeDefined();
  });

  it('tests whether a filter btn is created dynamically for each type of Pokémon', () => {
    const isPokemonFavoriteById = {};
    pokemons.reduce((acc, poke) => {
      isPokemonFavoriteById[poke.id] = false;
      return acc;
    }, {});
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const filterBtn = getAllByTestId('pokemon-type-button');

    const arrayOfTypes = [...new
    Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    expect(filterBtn.length).toBe(arrayOfTypes.length);
  });

  it('test if the Next btn its disabled when there is one Pokémon of that type', () => {
    const isPokemonFavoriteById = {};
    pokemons.reduce((acc, poke) => {
      isPokemonFavoriteById[poke.id] = false;
      return acc;
    }, {});
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const arrayOfTypes = [...new
    Set(pokemons.reduce((types, { type }) => [...types, type], []))];
    const filteredTypes = arrayOfTypes
      .map((types) => pokemons.filter((poke) => poke.type === types));
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    let typeBtn;
    filteredTypes.forEach((el) => {
      if (el.length === 1) {
        typeBtn = getByRole('button', { name: el[0].type });
        userEvent.click(typeBtn);
        expect(btnNext).toBeDisabled();
      }
    });
  });
});
