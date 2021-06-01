import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js /', () => {
  test('Teste se página contém um heading h2 com o texto `Encountered pokémons`.', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  describe('É exibido o próximo Pokémon da lista quando clico no botão Próximo.', () => {
    test('O botão deve conter o texto `Próximo pokémon`', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText('Próximo pokémon')).toBeInTheDocument();
    });

    test('Os próximos Pokémons devem ser mostrados ao clicar no botão;', () => {
      const { getByText } = renderWithRouter(<App />);
      const btnProxPokemon = getByText('Próximo pokémon');
      pokemons.forEach((currPokemon) => {
        expect(getByText(currPokemon.name)).toBeInTheDocument();
        userEvent.click(btnProxPokemon);
      });
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  describe('Teste se a Pokédex tem os botões de filtro.', () => {
    test('A partir de um filtro, a Pokédex só mostra pokémons daquele tipo;', () => {
      const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
      const btnFiltroPokemon = getAllByTestId('pokemon-type-button');

      btnFiltroPokemon.forEach((typeButton) => {
        const pokemonType = typeButton.textContent;
        const btnProxPokemon = getByTestId('next-pokemon');
        userEvent.click(typeButton);
        expect(getByTestId('pokemon-type').textContent).toBe(pokemonType);
        userEvent.click(btnProxPokemon);
      });
    });
  });

  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test('O texto do botão deve ser `All`', () => {
      const { getByText } = renderWithRouter(<App />);
      const btnTodosPokemon = getByText('All');
      expect(btnTodosPokemon).toBeInTheDocument();
    });

    test('A Pokedéx mostra os Pokémons sem filtros clicando no botão `All`', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const btnTodosPokemon = getByText('All');
      userEvent.click(btnTodosPokemon);
      expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
    });
  });
});
