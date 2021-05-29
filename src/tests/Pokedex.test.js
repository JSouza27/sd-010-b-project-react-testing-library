import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Requisito 5', () => {
  test('Testando o componente Pokedex', () => {
    const { getByRole, container, getByTestId } = renderWithRouter(<App />);
    const paragraphNamePokemon = getByTestId('pokemon-name');

    const heading = getByRole('heading', {
      name: /Encountered Pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();

    const getButton = container.querySelector('.pokedex-button');
    expect(getButton.innerHTML).toEqual('Próximo pokémon');
    data.forEach((item) => {
      expect(paragraphNamePokemon.innerHTML).toEqual(item.name);
      userEvent.click(getButton);
    });
  });

  test('Testa se é mostrado apenas um pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const tamanhoPokemonContainer = getAllByTestId('pokemon-name').length;
    expect(tamanhoPokemonContainer).toEqual(1);
  });

  test('Testa se ao clicar no type do pokemon é mostrado apenas daquele tipo', () => {
    const { container, getByText, getAllByTestId, getByTestId } = renderWithRouter(
      <App />,
    );

    const allButton = getByText('Fire');
    const getAll = getAllByTestId('pokemon-type-button');
    console.log(getAll);
    userEvent.click(allButton);
    const divContainerPokemons = container.querySelector('.pokemon-overview');
    const childrenDiv = divContainerPokemons.children;
    expect(childrenDiv.item(1).innerHTML).toEqual('Fire');
    expect(childrenDiv.item(0).innerHTML).toEqual('Charmander');
    const nextPokemonButton = getByTestId('next-pokemon');
    userEvent.click(nextPokemonButton);
    expect(childrenDiv.item(1).innerHTML).toEqual('Fire');
    expect(childrenDiv.item(0).innerHTML).toEqual('Rapidash');
  });

  test('Testa se existe um botão "All" que reseta o filtro', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const firstPokemon = container.querySelector('.pokemon-overview').firstChild;
    const getButtonAll = getByText('All');
    expect(getButtonAll).toBeInTheDocument();
    userEvent.click(getButtonAll);
    expect(firstPokemon.innerHTML).toEqual('Pikachu');
  });
});
