import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const nextPokemon = 'next-pokemon';

  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(heading).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon
   da lista quando o botão Próximo pokémon é clicado.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const button = screen.getByTestId(nextPokemon);
    expect(button.innerHTML).toBe('Próximo pokémon');
  });

  test(`Os próximos Pokémons da lista devem
   ser mostrados, um a um, ao clicar sucessivamente no botão`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const button = screen.getByTestId(nextPokemon);
    userEvent.click(button);
    const namePokemon = screen.getByText('Charmander');
    expect(namePokemon).toBeInTheDocument();
  });

  test(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
   se estiver no último Pokémon da lista`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    for (let i = 0; i < pokemons.length; i += 1) {
      const button = screen.getByTestId(nextPokemon);
      userEvent.click(button);
    }

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const button = screen.getByRole('button', { name: 'All' });
    expect(button.innerHTML).toBe('All');
  });

  test(`A Pokedéx deverá mostrar os Pokémons normalmente
   (sem filtros) quando o botão All for clicado`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const buttonBug = screen.getByRole('button', { name: 'Bug' });
    userEvent.click(buttonBug);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });

  test(`Teste se é criado, dinamicamente,
  um botão de filtro para cada tipo de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const arrayTypePokemon = [
      'All', 'Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    arrayTypePokemon.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      if (type === 'All') {
        return expect(button).toBeInTheDocument();
      }
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-TestId', 'pokemon-type-button');
    });
  });
});

// Recebi auxilio dos colegas, Carlos Margato, Renato GSousa, Alan Tanaka, Eder Paiva, Junior Henrique. Obrigado a todos!
