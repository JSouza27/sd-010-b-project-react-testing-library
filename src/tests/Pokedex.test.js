import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemonNameTestId = 'pokemon-name';
const favorites = {
  4: true,
  10: false,
  23: false,
  25: false,
  65: false,
  78: true,
  143: false,
  148: false,
  151: false,
};
describe('Test "Pokedex" component', () => {
  it('has heading "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const heading = getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('checks next pokemon function"', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const next = getByRole('button', { name: /próximo pokémon/i });
    expect(next).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const pokemonName = getByTestId(pokemonNameTestId);
      expect(pokemonName.textContent).toBe(name);
      userEvent.click(next);
    });
  });

  it('checks buttons and function for filtering pokemons"', () => {
    const { getByRole, getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );

    const next = getByRole('button', { name: /próximo pokémon/i });
    const typesButtons = getAllByTestId('pokemon-type-button');
    const typesLength = 7;
    expect(typesButtons).toHaveLength(typesLength);

    const psychicButton = getByRole('button', { name: /psychic/i });
    userEvent.click(psychicButton);
    for (let i = 0; i < typesLength; i += 1) {
      const pokemonType = getByTestId('pokemon-type');
      expect(pokemonType.textContent).toBe('Psychic');
      userEvent.click(next);
    }
  });

  it('checks filter reset', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const next = getByRole('button', { name: /próximo pokémon/i });
    const all = getByRole('button', { name: /all/i });
    const fire = getByRole('button', { name: /fire/i });

    userEvent.click(fire);
    let pokemonName = getByTestId(pokemonNameTestId);
    expect(pokemonName.textContent).toBe('Charmander');
    userEvent.click(all);
    pokemonName = getByTestId(pokemonNameTestId);
    expect(pokemonName.textContent).toBe('Pikachu');
    userEvent.click(next);
    pokemonName = getByTestId(pokemonNameTestId);
    expect(pokemonName.textContent).toBe('Charmander');

    expect(all).toBeInTheDocument();
    expect(all.textContent).toBe('All');
  });

  it('reset filter to "all" when page reload ', () => {
    const { unmount, getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    let next = getByRole('button', { name: /próximo pokémon/i });
    const fire = getByRole('button', { name: /fire/i });

    userEvent.click(fire);
    let pokemonName = getByTestId(pokemonNameTestId);
    expect(pokemonName.textContent).toBe('Charmander');

    unmount();

    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    next = getByRole('button', { name: /próximo pokémon/i });
    pokemonName = getByTestId(pokemonNameTestId);
    expect(pokemonName.textContent).toBe('Pikachu');
    userEvent.click(next);
    pokemonName = getByTestId(pokemonNameTestId);
    expect(pokemonName.textContent).toBe('Charmander');
  });

  it('checks next button is disable if only one pokemon of type', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const electric = getByRole('button', { name: /electric/i });
    const next = getByRole('button', { name: /próximo pokémon/i });

    expect(next).not.toBeDisabled();
    userEvent.click(electric);
    expect(next).toBeDisabled();
  });
});
