import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('testing the `<Pokedex.js />` component', () => {
  test('testing if page contains an h2 heading with the text `Encountered Pokémon`',
    () => {
      const isPokemonFavoriteById = [];

      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });

      expect(heading).toBeInTheDocument();
    });

  test('see if the next Pokémon is displayed when the `Next Pokémon` button is clicked',
    () => {
      const isPokemonFavoriteById = [];

      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

      expect(nextButton).toBeInTheDocument();

      pokemons.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(nextButton);
      });
    });

  test('testing if only one Pokémon is shown at a time',
    () => {
      const isPokemonFavoriteById = [];

      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      expect(screen.queryAllByTestId('pokemon-name')).toHaveLength(1);
    });

  test('testing if Pokédex has the filter buttons',
    () => {
      const isPokemonFavoriteById = [];

      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const buttonFilterFire = screen.getByRole('button', { name: 'Fire' });

      expect(buttonFilterFire).toBeInTheDocument();

      userEvent.click(buttonFilterFire);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/fire/i);

      expect(buttonFilterFire).toHaveTextContent(/fire/i);
    });

  test('testing if the Pokédex contains a button to reset the filter',
    () => {
      const isPokemonFavoriteById = [];

      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const allButton = screen.getByRole('button', { name: 'All' });

      expect(allButton).toHaveTextContent(/all/i);

      const nextButton = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      pokemons.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(nextButton);
      });

      // **a parte abaixo foi feita baseada no arquivo do repositório do João Herculano**
      userEvent.click(nextButton);
      const fireButton = screen.getByRole('button', {
        name: /fire/i,
      });
      userEvent.click(fireButton);
      userEvent.click(allButton);

      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });

  test('testing if a filter button is created dynamically for each type of Pokémon',
    () => {
      const isPokemonFavoriteById = [];
      const magicNumber = 7;

      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const buttonFilter = screen.queryAllByTestId('pokemon-type-button');

      expect(buttonFilter).toHaveLength(magicNumber);

      pokemons.forEach((pokemon) => {
        const buttonsFilterOfType = screen.getByRole('button', { name: pokemon.type });

        userEvent.click(buttonsFilterOfType);

        expect(screen.getAllByText(pokemon.type)).toHaveLength(2);
      });

      pokemons.forEach((pokemon) => {
        const buttonsFilterOfType = screen.getByRole('button', { name: pokemon.type });
        expect(buttonsFilterOfType).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
      });
    });

  test('if the filtered list has a pokemon, the `Next Pokemon` button must be disabled',
    () => {
      const isPokemonFavoriteById = [];

      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const poisonButton = screen.getByRole('button', { name: /poison/i });
      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });

      userEvent.click(poisonButton);
      expect(nextPokemonButton).toHaveAttribute('disabled');
    });
});
