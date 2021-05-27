import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
// import data from '../data';
import App from '../App';

const expectWithClass = (className, arrayIndice, pokemonType) => {
  const numberMagic = parseInt(arrayIndice, 0);
  const buttonLocation = document.querySelectorAll(className)[numberMagic];
  expect(buttonLocation.innerHTML).toMatch(pokemonType);
};
const BUTTONTEXTANDFILTER = '.button-text.filter-button';
const NEXT_POKEMON_ID = 'next-pokemon';
const POKEMON_NAME = 'pokemon-name';

describe('5 - Pokedex buttons, actions and text of page  ', () => {
  test('1 - Checking if there is a <h2 /> Encountered pokémons ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const FoundPokemons = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémon/i,
    });
    expect(FoundPokemons).toBeInTheDocument();
  });

  test('2 - Check Buttons : Next Button and Name of Next Button ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokemon = screen.getByTestId(POKEMON_NAME);
    expect(pokemon).toHaveTextContent('Pikachu');
    const nextButton = screen.getByTestId(NEXT_POKEMON_ID);
    expect(nextButton).toHaveTextContent('Próximo pokémon');
    userEvent.click(nextButton);
    const nextPokemon = screen.getByTestId(POKEMON_NAME);
    expect(nextPokemon).toHaveTextContent('Charmander');
    const quantityOfPokemons = document.querySelectorAll('.pokemon').length;
    expect(quantityOfPokemons).toEqual(1);
  });

  test('3 - Check allButton ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const firstPokemon = screen.getByTestId(POKEMON_NAME);
    expect(firstPokemon).toHaveTextContent('Pikachu');
    const nextButton = screen.getByTestId(NEXT_POKEMON_ID);
    userEvent.click(nextButton);
    const nextPokemon = screen.getByTestId(POKEMON_NAME);
    expect(nextPokemon).toHaveTextContent('Charmander');
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    userEvent.click(allButton);
    expect(firstPokemon).toHaveTextContent('Pikachu');
  });
  test('4 - Check filter button quantity and disable next button ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    const SEVEN_BUTTONS = buttonFilter.length;
    expect(buttonFilter.length).toEqual(SEVEN_BUTTONS);
    expectWithClass(BUTTONTEXTANDFILTER, '3', 'Bug');
    const bugButton = document.querySelectorAll(BUTTONTEXTANDFILTER)[3];
    userEvent.click(bugButton);
    const nextButton = screen.getByTestId(NEXT_POKEMON_ID);
    expect(nextButton.disabled).toBeTruthy();
    expectWithClass(BUTTONTEXTANDFILTER, '1', 'Electric');
    expectWithClass(BUTTONTEXTANDFILTER, '2', 'Fire');
    expectWithClass(BUTTONTEXTANDFILTER, '4', 'Poison');
    expectWithClass(BUTTONTEXTANDFILTER, '5', 'Psychic');
    expectWithClass(BUTTONTEXTANDFILTER, '6', 'Normal');
    expectWithClass(BUTTONTEXTANDFILTER, '7', 'Dragon');
  });
});
