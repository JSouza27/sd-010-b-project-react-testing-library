import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the pokedex', () => {
  const idPokemonName = 'pokemon-name';
  const pokemonButtonName = 'Próximo pokémon';

  it('test the <h2> tag "encountered pokemons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const titlePokedex = getByRole('heading', {
      level: 2,
    });
    expect(titlePokedex).toHaveTextContent('Encountered pokémons');
  });

  it('test if the pokemon changes when next button is clicked', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const nextBtn = getByRole('button', {
      name: pokemonButtonName,
    });

    expect(nextBtn).toHaveTextContent('Próximo pokémon');
    const initialPokemonName = getByTestId(idPokemonName);

    expect(initialPokemonName).toHaveTextContent('Pikachu');

    userEvent.click(nextBtn);
    const pokemonNameAfterClick = getByTestId(idPokemonName);

    expect(pokemonNameAfterClick).toHaveTextContent('Charmander');
  });

  it('test if the first pokemon appears after the last pokemon', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const numberOfPokemons = 8;
    const nextBtn = getByRole('button', {
      name: pokemonButtonName,
    });

    for (let x = 0; x < numberOfPokemons; x += 1) {
      userEvent.click(nextBtn);
    }

    const atualPokemon = getByTestId(idPokemonName);
    expect(atualPokemon).toHaveTextContent('Dragonair');

    userEvent.click(nextBtn);
    const nextPokemon = getByTestId(idPokemonName);

    expect(nextPokemon).toHaveTextContent('Pikachu');
  });

  it('test if there is just 1 pokemon', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const nextBtn = getByRole('button', {
      name: pokemonButtonName,
    });
    const pokemonsInScreen = getAllByTestId(idPokemonName);

    expect(pokemonsInScreen.length).toBe(1);

    userEvent.click(nextBtn);

    const pokemonsInScreenNow = getAllByTestId(idPokemonName);
    expect(pokemonsInScreenNow.length).toBe(1);
  });

  it('test if the type buttons works', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const psychicButton = getAllByTestId('pokemon-type-button')[4];

    expect(psychicButton).toHaveTextContent('Psychic');

    userEvent.click(psychicButton);

    const typeOfPokemon = getByTestId('pokemon-type');

    expect(typeOfPokemon).toHaveTextContent('Psychic');
  });

  it('test if the button "All" renderizes all pokemons', () => {
    const { getByTestId, getAllByTestId, getByRole } = renderWithRouter(<App />);
    const psychicButton = getAllByTestId('pokemon-type-button')[4];
    const allButton = getByRole('button', {
      name: 'All',
    });

    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');

    userEvent.click(psychicButton);

    let pokemonName = getByTestId(idPokemonName);
    expect(pokemonName).toHaveTextContent('Alakazam');

    userEvent.click(allButton);

    pokemonName = getByTestId(idPokemonName);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
