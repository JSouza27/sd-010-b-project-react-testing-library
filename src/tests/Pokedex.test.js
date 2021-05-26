import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';
// import Pokedex from '../components/Pokedex';

const nameId = 'next-pokemon';

describe('Teste Pokedex', () => {
  test('5.1 - Teste se página contém um heading com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const text = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(text).toBeInTheDocument();
  });
  test('5.2.1 botão deve conter Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const button = getByTestId(nameId);
    userEvent.click(button);
    expect(button).toBeInTheDocument();
  });
  test('O botão deve conter o texto "Próximo Pokémon"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();
  });
  test('Os proximos pokemons devem ser mostrados ao clicar no botão', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const button = getByTestId(nameId);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    userEvent.click(button);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    userEvent.click(button);
    const caterpie = getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
    userEvent.click(button);
    const ekans = getByText('Ekans');
    expect(ekans).toBeInTheDocument();
    userEvent.click(button);
    const alakazam = getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    userEvent.click(button);
    const mew = getByText('Mew');
    expect(mew).toBeInTheDocument();
    userEvent.click(button);
    const rapidash = getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
    userEvent.click(button);
    const snorlax = getByText('Snorlax');
    expect(snorlax).toBeInTheDocument();
    userEvent.click(button);
    const dragonair = getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();
  });
  test('5.3 - Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    const nextPokemon = getByText(/pikachu/i);
    expect(nextPokemon).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).not.toBe(/Charmander/i);
    expect(name).not.toBe(/Caterpie/i);
    expect(name).not.toBe(/Ekans/i);
    expect(name).not.toBe(/Alakazam/i);
    expect(name).not.toBe(/Mew/i);
    expect(name).not.toBe(/Rapidash/i);
    expect(name).not.toBe(/Snorlax/i);
    expect(name).not.toBe(/Dragonair/i);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Psychic/i,
    });
    expect(button).toBeInTheDocument();
  });
  test('A pokedex de circular somente entre os Pokemosn da classe', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Psychic/i,
    });
    userEvent.click(button);
    const name = getByText(/Alakazam/i);
    expect(name).toBeInTheDocument();
  });
  test('teste se há um botão reset com o valor All', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /All/i,
    });
    expect(button).toBeInTheDocument();
  });
  test('A Pokedéx deverá mostrar tds os Pokémons quando o botão All for clicado;', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /All/i,
    });
    userEvent.click(button);
    const name = getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
  });
  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const { getByText } = renderWithRouter(<App />);
    const name = getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
  });
  test('deve existir um botão para cada tipo', () => {
    const { getByRole } = renderWithRouter(<App />);
    const fire = getByRole('button', {
      name: /Fire/i,
    });
    expect(fire).toBeInTheDocument();

    const psychic = getByRole('button', {
      name: /Psychic/i,
    });
    expect(psychic).toBeInTheDocument();

    const poison = getByRole('button', {
      name: /Poison/i,
    });
    expect(poison).toBeInTheDocument();
  });
  test('mostrar opções filtro para cada tipo. o botão All precisa estar visível.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const all = getByRole('button', {
      name: /All/i,
    });
    const fire = getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fire);
    expect(all).toBeInTheDocument();
  });
});
describe('parte 2', () => {
  test('se desabilita "proximo pokemon"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const eletric = getByRole('button', {
      name: /Electric/i,
    });
    const next = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(eletric);
    expect(next).toHaveStyle('background-color: ButtonFace');
  });
  test('verifica dataTestId', () => {
    const buttonType = 7;
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(buttonType);
  });
});
