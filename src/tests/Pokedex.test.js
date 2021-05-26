import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);
  const pokemonH2 = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });
  expect(pokemonH2).toBeInTheDocument();
});

test('Testa quando o botão Próximo pokémon é clicado', () => {
  renderWithRouter(<App />);
  const buttonNextPokemon = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  pokemons.forEach((pokemon) => {
    const namePokemon = screen.getByText(pokemon.name);
    expect(namePokemon).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
  });
});

test('Testa se é mostrado apenas um Pokémon por vez.', () => {
  renderWithRouter(<App />);
  const linkDetails = screen.getAllByRole('link', {
    name: /More details/i,
  });
  expect(linkDetails).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  pokemons.forEach((pokemon) => {
    const buttonTypes = screen.getByRole('button', {
      name: [pokemon.type],
    });
    expect(buttonTypes).toBeInTheDocument();
  });
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const buttonAll = screen.getByRole('button', {
    name: 'All',
  });
  userEvent.click(buttonAll);
});

test('Teste o botão de filtro para cada tipo de Pokémon.', () => {
  renderWithRouter(<App />);
  pokemons.forEach((pokemon) => {
    const typePokemons = screen.getByRole('button', {
      name: pokemon.type,
    });
    expect(typePokemons).toBeInTheDocument();
  });
  const buttonAll = screen.getByRole('button', {
    name: 'All',
  });
  expect(buttonAll).toBeInTheDocument();
});

test('Testa botão de Próximo pokémon quando tiver um pokémon.', () => {
  renderWithRouter(<App />);
  const buttonBug = screen.getByRole('button', {
    name: /bug/i,
  });
  userEvent.click(buttonBug);

  const nextPokemon = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  expect(nextPokemon).toBeDisabled();
});
