import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

const pokemonN = 'pokemon-name';

describe('routes', () => {
  test('tests if there s a h2 with the text `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    // console.log(heading);
    expect(heading).toBeInTheDocument();
  });

  test('tests if when u click the `next Pokémon` shows the next pokemon ', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();

    const pokemon = getByTestId(pokemonN);

    const list = pokemons.map(({ name }) => name);
    list.forEach((_, index) => {
      // console.log(pokemon.textContent);
      // console.log(index);
      expect(pokemon.textContent).toBe(list[index]);

      userEvent.click(button);
    });
  });

  test('tests if the pokémons array reset', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();

    const pokemon = getByTestId(pokemonN);

    const list = pokemons.map(({ name }) => name);
    list.forEach(() => userEvent.click(button));

    // console.log(pokemon.textContent);

    expect(pokemon.textContent).toBe(list[0]);
  });

  test('tests if the page shows only one pokémon', () => {
    const { getByRole, getAllByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();

    const list = pokemons.map(({ name }) => name);
    list.forEach(() => {
      const link = getAllByText('More details');
      // console.log(link.length);
      expect(link.length).toBe(1);

      userEvent.click(button);
    });
  });

  test('tests if the filter by type exists and ', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);

    const button = getAllByTestId('pokemon-type-button');

    const buttonNext = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();

    const pokemonsType = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    button.forEach((type, index) => {
      expect(type.textContent).toBe(pokemonsType[index]);
    });
  });

  test('tests if u can reset clicking on `all`', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const pokemon = getByTestId(pokemonN);
    const button = getByRole('button', {
      name: 'All',
    });

    userEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(pokemon.textContent).toBe('Pikachu');
  });

  test('tests if the filter by type buttons actually works', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const pokemonsType = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const button = getAllByTestId('pokemon-type-button');

    button.forEach((type, index) => {
      // console.log(type.textContent);
      // console.log(pokemonsType[index]);
      expect(type.textContent).toBe(pokemonsType[index]);
    });
  });
});
