import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
// import data from '../data';
import App from '../App';

const BUTTONTEXTANDFILTER = '.button-text.filter-button';

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
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent('Próximo pokémon');
    userEvent.click(nextButton);
    const nextPokemon = screen.getByTestId('pokemon-name');
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
    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon).toHaveTextContent('Pikachu');
    const nextButton = screen.getByTestId('next-pokemon');
    userEvent.click(nextButton);
    const nextPokemon = screen.getByTestId('pokemon-name');
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
    const bugButton = document.querySelectorAll('.button-text.filter-button')[3];
    expect(bugButton.innerHTML).toMatch('Bug');
    userEvent.click(bugButton);
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton.disabled).toBeTruthy();
    const eletricButton = document.querySelectorAll(BUTTONTEXTANDFILTER)[1];
    expect(eletricButton.innerHTML).toMatch('Electric');
    const fireButton = document.querySelectorAll(BUTTONTEXTANDFILTER)[2];
    expect(fireButton.innerHTML).toMatch('Fire');
    const poisonButton = document.querySelectorAll(BUTTONTEXTANDFILTER)[4];
    expect(poisonButton.innerHTML).toMatch('Poison');
    const psychicButton = document.querySelectorAll(BUTTONTEXTANDFILTER)[5];
    expect(psychicButton.innerHTML).toMatch('Psychic');
    const normalButton = document.querySelectorAll(BUTTONTEXTANDFILTER)[6];
    expect(normalButton.innerHTML).toMatch('Normal');
    const dragonButton = document.querySelectorAll(BUTTONTEXTANDFILTER)[7];
    expect(dragonButton.innerHTML).toMatch('Dragon');
  });
});
