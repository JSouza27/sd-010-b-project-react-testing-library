import { screen } from '@testing-library/dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Testar o Pokedex.js', () => {
  test('Verifica se o titulo "Encountered pokémons" renderiza', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon clicando em proximo pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);

    data.forEach(({ name }) => {
      const buttonNext = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });

      const firstPokemon = getByText(name);
      expect(firstPokemon).toBeInTheDocument();

      userEvent.click(buttonNext);
    });

    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Verifica se é exibido um pokémon por vez.', () => {
    const { getByText } = renderWithRouter(<App />);

    const oneDetails = getByText(/More details/i);
    expect(oneDetails).toBeInTheDocument();
  });

  test('Testando os botões filtro fire e all.', () => {
    const { getByText } = renderWithRouter(<App />);

    const typeFire = screen.getByRole('button', {
      name: /Fire/i,
    });
    userEvent.click(typeFire);
    const Charmander = getByText(/Charmander/i);
    expect(Charmander).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextPokemon);
    const Rapidash = getByText(/Rapidash/i);
    expect(Rapidash).toBeInTheDocument();

    const allPokemon = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(allPokemon);
    const Pikachu = getByText(/Pikachu/i);
    expect(Pikachu).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem todos os botões de filtro.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const typesPokemon = [];
    data.forEach(({ type }) => {
      if (!typesPokemon.includes(type)) {
        typesPokemon.push(type);
      }
    });

    const number = 7;
    typesPokemon.forEach(() => {
      const typeButton = getAllByTestId('pokemon-type-button');
      expect(typeButton.length).toBe(number);
    });
  });
});
