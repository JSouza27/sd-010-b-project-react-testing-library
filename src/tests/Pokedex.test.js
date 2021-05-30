import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokedex from '../components/Pokedex';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

const favorites = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });
  test(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo
  pokémon é clicado.`, () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    const allBtn = screen.getByText('All');
    userEvent.click(allBtn);
    const pikachu = pokemons[0].name;
    const nextBtn = screen.getByText('Próximo pokémon');
    for (let i = 0; i < pokemons.length; i += 1) {
      userEvent.click(nextBtn);
    }
    const name = screen.getByTestId('pokemon-name').textContent;
    expect(name).toBe(pikachu);
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { container } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );
    const pokemon = container.getElementsByClassName('pokemon');
    expect(pokemon.length).toEqual(1);
  });
  test('Teste se a Pokédex tem os botões de filtro - parte 1.', () => {
    Pokedex.state = {
      pokemonIndex: 0,
    };
    const pokemonsFire = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    renderWithRouter(<Pokemon
      isFavorite={ false }
      pokemon={ pokemonsFire[Pokedex.state.pokemonIndex] }
    />);
    const name = screen.getByTestId('pokemon-name').textContent;
    expect(name).toBe('Charmander');
  });
  test('Teste se a Pokédex tem os botões de filtro - parte 2.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    const tps = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
    const types = screen.getAllByTestId('pokemon-type-button');
    tps.forEach((tp, index) => {
      const bool = tp === types[index].textContent;
      expect(bool).toBe(true);
    });
  });
  test(`O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de
  Pokémons tiver um só pokémon.`, () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    const bugBtn = screen.getByText('Bug');
    const nextBtn = screen.getByTestId('next-pokemon');
    userEvent.click(bugBtn);
    expect(nextBtn.disabled).toBe(true);
  });
});
