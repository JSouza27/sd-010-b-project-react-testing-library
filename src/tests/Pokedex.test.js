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
});
