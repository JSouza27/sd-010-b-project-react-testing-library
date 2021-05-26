import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper';
import pokes from '../data';
import { Button } from '../components';

describe('Pokedex', () => {
  test(`Teste se página contém um heading h2 com o texto
   Encountered pokémons`, () => {
    const { getByText } = renderWithRouter(<App />);
    const txt = getByText(/Encountered pokémons/i);
    expect(txt).toBeInTheDocument();
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
  });
  test(`Teste se é exibido o próximo Pokémon da lista quando o
   botão Próximo pokémon é clicado`, () => {
    const { getByText } = renderWithRouter(<App />);
    const next = getByText('Próximo pokémon');
    pokes.forEach((poke) => {
      expect(getByText(poke.name)).toBeInTheDocument();
      fireEvent.click(next);
    });
  });
  test('Teste se existem os filtros', () => {
    const { getByText } = renderWithRouter(<App />);
    const btn = screen.getAllByRole('button');
    const maxFilter = 8;
    for (let i = 1; i < maxFilter; i += 1) {
      const poke = screen.getByTestId('pokemon-type');
      fireEvent.click(btn[i]);
      expect(btn[i].innerHTML).toEqual(poke.innerHTML);
      const next = getByText('Próximo pokémon');
    }
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const reset = getByText('All');
    fireEvent.click(reset);
    pokes.forEach((poke) => {
      const next = getByText('Próximo pokémon');
      expect(getByText(poke.name)).toBeInTheDocument();
      fireEvent.click(next);
    });
  });
  test('Teste se o botão desabilita', () => {
    renderWithRouter(<App />);
    const btn = screen.getAllByTestId('pokemon-type-button');
    const maxFilter = 7;
    for (let i = 1; i < maxFilter; i += 1) {
      const poke = screen.getByTestId('pokemon-type');
      fireEvent.click(btn[i]);
      expect(btn[i].innerHTML).toEqual(poke.innerHTML);
      const next = screen.getByText('Próximo pokémon');
      const pokeArray = pokes.filter(({ type }) => type === btn[i].innerHTML);
      if (pokeArray.length === 1) {
        expect(next.disabled).toBe(true);
      }
    }
  });
});
