import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons.', async () => {
    renderWithRouter(<App />);

    const headingH2 = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(headingH2).toBeInTheDocument();
  });

  test('Testa se o botão tem o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
  });

  test('Testa próximos Pokémons mostrados, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);

    pokemons.forEach(({ name }) => {
      const textDetails = screen.getAllByText('More details');
      expect(textDetails.length).toBe(1);

      const getName = screen.getByText(name);
      expect(getName).toBeInTheDocument();

      const getButton = screen.getByText('Próximo pokémon');
      userEvent.click(getButton);
    });
    const getFirstPokemon = screen.getByText(pokemons[0].name);
    expect(getFirstPokemon).toBeInTheDocument();
  });
});
