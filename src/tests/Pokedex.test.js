import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const onlyNames = [];
data.forEach((value) => onlyNames.push(value.name));

describe('Testando página Pokedex', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btnNextPokemon = getByTestId('next-pokemon');
    const pokemonName = getByTestId('pokemon-name');

    expect(btnNextPokemon.textContent).toBe('Próximo pokémon');

    onlyNames.forEach((name) => {
      expect(pokemonName.textContent).toBe(name);
      fireEvent.click(btnNextPokemon);
    });
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonNameArr = getAllByTestId('pokemon-name');
    expect(pokemonNameArr.length).toBe(1);
  });
});
