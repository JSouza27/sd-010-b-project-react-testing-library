import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemonList from '../data';
import App from '../App';

const nameId = 'pokemon-name';

test('Teste se página contém um heading com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });

  expect(heading).toBeInTheDocument();
});

test('O botão deve conter o texto "Próximo Pokémon"', () => {
  const { getByRole } = renderWithRouter(<App />);
  const button = getByRole('button', {
    name: /Próximo pokémon/i,
  });
  expect(button).toBeInTheDocument();
});

test('Os próximos Pokémons da lista devem ser mostrados, um a um', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const pokemonName = getByTestId(nameId);
  const button = getByRole('button', {
    name: /Próximo pokémon/i,
  });
  fireEvent.click(button);
  expect(pokemonName.textContent).toBe('Charmander');
});

test('se estiver no último Pokémon da lista ir para o primeiro', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const pokemonName = getByTestId(nameId);
  const button = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  for (let index = 0; index < pokemonList.length; index += 1) {
    fireEvent.click(button);
  }

  expect(pokemonName.textContent).toBe(pokemonList[0].name);
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemons = getAllByTestId(nameId);
  expect(pokemons.length).toBe(1);
});

test('Pokédex deve circular somente pelos pokémons daquele tipo', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);

  pokemonList.forEach(({ type }) => {
    const btnFiltro = getByRole('button', { name: type });

    fireEvent.click(btnFiltro);
    const pokemonAtual = getByTestId('pokemon-type');
    expect(pokemonAtual).toHaveTextContent(type);
  });
});

test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttons = getAllByTestId('pokemon-type-button');

  const types = [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  buttons.forEach((button, index) => {
    expect(button.textContent).toBe(types[index]);
  });
});

test(' Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const reset = getByRole('button', { name: 'All' });

  fireEvent.click(reset);
  const currentPokemon = getByTestId(nameId);

  expect(reset).toBeInTheDocument();
  expect(currentPokemon.textContent).toBe('Pikachu');
});
