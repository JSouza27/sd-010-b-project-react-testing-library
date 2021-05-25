import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouters';
import App from '../App';
import Pokemons from '../data';

describe('Teste requisito 5 Pokedex.js.', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText('Encountered pokémons');
    expect(h2).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByTestId('next-pokemon');
    expect(nextPokemon).toHaveTextContent('Próximo pokémon');
    const pokemonName = Pokemons.map((pokemon) => pokemon.name);

    pokemonName.forEach((pokemon) => {
      const pokemonNames = getByText(pokemon);

      fireEvent.click(nextPokemon);

      expect(pokemonNames).toBeInTheDocument();
    });

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const pokeImage = getAllByRole('img');

    expect(pokeImage.length).toBe(1);
  });
});
