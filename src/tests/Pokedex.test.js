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

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonButton = getAllByTestId('pokemon-type-button');
    const PokemonsElements = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    pokemonButton.forEach(
      (types, index) => expect(types.innerHTML).toBe(PokemonsElements[index]),
    );
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'All' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(button.innerHTML).toBe('All');
  });

  test('Teste se é criado, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    Pokemons.forEach(({ type }) => {
      expect(getByRole('button', { name: type })).toBeInTheDocument();
    });
    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  test(`'Deve existir um botão de filtragem para cada tipo 
    de Pokémon disponível do tipo Fire, Psychic, 
    Electric, Bug, Poison, Dragon e Normal'`, () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const types = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    const typeLength = 7;
    types.forEach((_, index) => {
      fireEvent.click(getByText(types[index]));
      const fndtype = getAllByTestId('pokemon-type-button');
      expect(fndtype.length).toBe(typeLength);
      const buttoAll = getByText('All');
      expect(buttoAll).toBeInTheDocument();
    });
  });

  test(`'O botão de Próximo pokémon deve ser desabilitado 
  quando a lista filtrada de Pokémons tiver um só pokémon'`, () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const eletric = getAllByText('Electric');
    fireEvent.click(eletric[1]);
    fireEvent.click(getByText('Próximo pokémon'));
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
