import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Teste do componente <Pokedex.js />', () => {
  const testIdName = 'pokemon-name';
  const testIdNextButton = 'next-pokemon';
  test('Verifica se contém um heading h2 com o texto Encountered pokémons.', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        {/* Dica de renderizar o <App /> feita pelo instrutor Eduardo */}
        <App pokemons={ pokemons } />
      </Router>,
    );
    const encouteredHeading = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(encouteredHeading).toBeInTheDocument();
  });

  test('Verifica se é mostrado o próximo pokemon quando apertado o botão', () => {
    const history = createMemoryHistory();
    const { queryByTestId, getByText } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const firstPokemon = queryByTestId(testIdName);
    pokemons.map((pokemon) => {
      const currentPokemon = queryByTestId(testIdName);
      const currentPokemonName = Object.values(currentPokemon)[1].children;
      expect(currentPokemonName).toBe(pokemon.name);
      const nextButton = getByText('Próximo pokémon');
      expect(nextButton).toBeInTheDocument();
      userEvent.click(nextButton);
      return 0;
    });
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const history = createMemoryHistory();
    const { queryAllByTestId } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const pokemon = queryAllByTestId(testIdName);
    expect(pokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const history = createMemoryHistory();
    const { queryAllByTestId, getByTestId } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );

    const typeButtons = queryAllByTestId('pokemon-type-button');
    const buttonType = Object.values(typeButtons[1])[1].children;
    expect(buttonType).toBe('Fire');

    userEvent.click(typeButtons[1]);

    const pokeType = getByTestId('pokemon-type');
    const pokeFireType = Object.values(pokeType)[1].children;

    expect(buttonType).toBe(pokeFireType);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const history = createMemoryHistory();
    const { getByRole, queryByTestId } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const buttonAll = getByRole('button', {
      name: 'All',
    });

    userEvent.click(buttonAll);
    let pokemon = queryByTestId(testIdName);
    let pokemonName = Object.values(pokemon)[1].children;
    expect(pokemonName).toBe('Pikachu');

    const nextButton = queryByTestId(testIdNextButton);
    userEvent.click(nextButton);
    pokemon = queryByTestId(testIdName);
    pokemonName = Object.values(pokemon)[1].children;
    expect(pokemonName).toBe('Charmander');
  });

  test('Verifica se existe um botão de filtro para cada tipo de Pokémon', () => {
    const history = createMemoryHistory();
    const { queryAllByTestId, getByText } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    const typeButtons = queryAllByTestId('pokemon-type-button');
    expect(Object.values(typeButtons[0])[1].children).toBe('Electric');
    expect(buttonAll).toBeInTheDocument();
    expect(Object.values(typeButtons[1])[1].children).toBe('Fire');
    expect(buttonAll).toBeInTheDocument();
    expect(Object.values(typeButtons[2])[1].children).toBe('Bug');
    expect(buttonAll).toBeInTheDocument();
    expect(Object.values(typeButtons[3])[1].children).toBe('Poison');
    expect(buttonAll).toBeInTheDocument();
    expect(Object.values(typeButtons[4])[1].children).toBe('Psychic');
    expect(buttonAll).toBeInTheDocument();
    expect(Object.values(typeButtons[5])[1].children).toBe('Normal');
    expect(buttonAll).toBeInTheDocument();
    expect(Object.values(typeButtons[6])[1].children).toBe('Dragon');
    expect(buttonAll).toBeInTheDocument();
  });

  test('Verifica se o botão de próximo é desabilidatado quando só tem um pokemon', () => {
    const history = createMemoryHistory();
    const { queryByTestId, getByRole } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const nextButton = queryByTestId(testIdNextButton);
    const electricButton = getByRole('button', {
      name: 'Electric',
    });
    expect(nextButton && electricButton).toBeInTheDocument();

    userEvent.click(electricButton);

    expect(nextButton).toBeDisabled();
  });
});
