import React from 'react';
import userEvent from '@testing-library/user-event';
import { getAllByAltText } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se página contém um heading h2', () => {
    const { getByText } = renderWithRouter(<App />);
    const botao = getByText(/Próximo pokémon/i);
    userEvent.click(botao);
    let name = getByText(/Charmander/i);
    expect(name).toBeInTheDocument();
    userEvent.click(botao);
    name = getByText(/Caterpie/i);
    expect(name).toBeInTheDocument();
    userEvent.click(botao);
    name = getByText(/Ekans/i);
    expect(name).toBeInTheDocument();
    userEvent.click(botao);
    name = getByText(/Alakazam/i);
    expect(name).toBeInTheDocument();
    userEvent.click(botao);
    name = getByText(/Mew/i);
    expect(name).toBeInTheDocument();
    userEvent.click(botao);
    name = getByText(/Rapidash/i);
    expect(name).toBeInTheDocument();
    userEvent.click(botao);
    name = getByText(/Snorlax/i);
    expect(name).toBeInTheDocument();
    userEvent.click(botao);
    name = getByText(/Dragonair/i);
    expect(name).toBeInTheDocument();
    userEvent.click(botao);
    name = getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const type = getByText('Poison');
    userEvent.click(type);
    const number = getAllByText('Poison');
    expect(number.length).toBe(2);
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const type = getByText('All');
    userEvent.click(type);
    const botao = getByText(/Próximo pokémon/i);
    userEvent.click(botao);
    const name = getByText(/Charmander/i);
    expect(name).toBeInTheDocument();
    history.push('/');
    userEvent.click(botao);
    expect(name).toBeInTheDocument();
  });
  it('Teste se é criado, dinamicamente, um botão de filtro.', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const number = getAllByTestId('pokemon-type-button');
    const test = 7;
    expect(number.length).toBe(test);
    const All = getByRole('button', {
      name: 'All',
    });
    expect(All).toBeInTheDocument();
    const Fire = getByRole('button', {
      name: 'Fire',
    });
    expect(Fire).toBeInTheDocument();
    const Psychic = getByRole('button', {
      name: 'Psychic',
    });
    expect(Psychic).toBeInTheDocument();
    const Electric = getByRole('button', {
      name: 'Electric',
    });
    expect(Electric).toBeInTheDocument();
    const Bug = getByRole('button', {
      name: 'Bug',
    });
    expect(Bug).toBeInTheDocument();
    const Poison = getByRole('button', {
      name: 'Poison',
    });
    expect(Poison).toBeInTheDocument();
    const Dragon = getByRole('button', {
      name: 'Dragon',
    });
    expect(Dragon).toBeInTheDocument();
    const Normal = getByRole('button', {
      name: 'Normal',
    });
    expect(Normal).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const Electric = getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(Electric);
    const botao = getByText(/Próximo pokémon/i);
    userEvent.click(botao);
    const name = getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
  });
});
