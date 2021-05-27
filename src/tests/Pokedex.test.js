import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Data from '../data';
// import Pokedex from '../components/Pokedex';
const btnPokemon = 'Próximo pokémon';
describe('testes na Pokedex.js', () => {
  test('Testando a exibição da H2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(home).toBeInTheDocument();
  });
  test('Testando a lista de pokemon é exibida', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(btnPokemon);
    expect(nextButton).toBeInTheDocument();
    const pikachu = getByText('Pikachu');
    fireEvent.click(nextButton);
    const chamander = getByText('Charmander');
    expect(chamander).toBeInTheDocument();
    Data.forEach((pokemon) => {
    //   fireEvent.click(nextButton);
    //   const pokemonName = getByText(pokemon.name)
    // expect(pokemonName).toBeInTheDocument();
      if (pokemon.name === 'Dragonair') {
        fireEvent.click(nextButton);
        expect(pikachu).toBeInTheDocument();
      }
    });
  });
  test('Testando se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const testId = getAllByTestId('pokemon-name');
    expect(testId).toHaveLength(1);
  });
  test('Testando o botão de filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const bug = getByText('Bug');
    fireEvent.click(bug);
    const caterpie = getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });
  test('Testando botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const all = getByText('All');
    fireEvent.click(all);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const nextPokemon = getByText(btnPokemon);
    fireEvent.click(nextPokemon);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
  test('Teste se é criado, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const array = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    array.forEach((item) => {
      const button = getByRole('button', {
        name: item,
      });
      if (item === 'All') {
        return expect(button.textContent).toBe(item);
      }
      expect(button.textContent).toBe(item);
      expect(button).toHaveAttribute('data-TestId', 'pokemon-type-button');
    });
  });
  test(
    'Testando o botão de Próximo se está desabilitado quando a lista é filtrada',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const bug = getByText('Bug');
      fireEvent.click(bug);
      const next = getByText(btnPokemon);
      expect(next).toHaveAttribute('disabled');
    },
  );
  // https://stackoverflow.com/questions/56593840/check-that-button-is-disabled-in-react-testing-library
});
