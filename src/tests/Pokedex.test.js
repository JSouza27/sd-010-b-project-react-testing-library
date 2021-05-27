import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  const nextPokemon = 'next-pokemon';
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const heading = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });
  it(`Teste se é exibido o próximo Pokémon
   da lista quando o botão Próximo pokémon é clicado.`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/');
    const button = getByTestId(nextPokemon);
    expect(button.innerHTML).toBe('Próximo pokémon');
  });
  it(`Os próximos Pokémons da lista devem
   ser mostrados, um a um, ao clicar sucessivamente no botão`, () => {
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    history.push('/');
    const button = getByTestId(nextPokemon);
    userEvent.click(button);
    const namePokemon = getByText('Charmander');
    expect(namePokemon).toBeInTheDocument();
  });
  it(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
   se estiver no último Pokémon da lista`, () => {
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    history.push('/');
    for (let i = 0; i < pokemons.length; i += 1) {
      const button = getByTestId(nextPokemon);
      userEvent.click(button);
    }
    const firstPokemon = getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const button = getByRole('button', { name: 'All' });
    expect(button.innerHTML).toBe('All');
  });
  it(`A Pokedéx deverá mostrar os Pokémons normalmente
   (sem filtros) quando o botão All for clicado`, () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const buttonBug = getByRole('button', { name: 'Bug' });
    userEvent.click(buttonBug);
    const buttonAll = getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const pokemon = getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
  it(`Teste se é criado, dinamicamente, 
  um botão de filtro para cada tipo de Pokémon`, () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const arrayTypePokemon = [
      'All', 'Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    arrayTypePokemon.forEach((type) => {
      const button = getByRole('button', { name: type });
      if (type === 'All') {
        return expect(button).toBeInTheDocument();
      }
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-TestId', 'pokemon-type-button');
    });
  });
});
