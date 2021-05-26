import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa componente Pokedex', () => {
  const nextPokemonString = 'Próximo pokémon';
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedexHeading = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexHeading).toBeInTheDocument();
  });
  it(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    const { getByRole, getByText, queryAllByRole } = renderWithRouter(<App />);
    const pokedexButton = getByRole('button', {
      name: nextPokemonString,
    });
    expect(pokedexButton).toBeInTheDocument();
    for (let index = 0; index < pokemons.length; index += 1) {
      if (index !== pokemons.length - 1) {
        fireEvent.click(pokedexButton);
        const nextPokemon = getByText(pokemons[index + 1].name);
        expect(nextPokemon).toBeInTheDocument();
      } else {
        fireEvent.click(pokedexButton);
        const nextPokemon = getByText(pokemons[0].name);
        expect(nextPokemon).toBeInTheDocument();
      }
      const link = queryAllByRole('link', {
        name: 'More details',
      });
      expect(link.length).toBe(1);
    }
  });
  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const typesArray = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];
    const { getByRole, queryByTestId } = renderWithRouter(<App />);
    const allButton = getByRole('button', {
      name: 'All',
    });
    typesArray.forEach((type) => {
      const button = getByRole('button', {
        name: type,
      });
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(allButton).toBeInTheDocument();
      const pokemonsByType = pokemons
        .filter((pokemon) => pokemon.type === type);
      const pokedexButton = getByRole('button', {
        name: nextPokemonString,
      });
      expect(pokedexButton).toBeInTheDocument();
      pokemonsByType.forEach(() => {
        fireEvent.click(pokedexButton);
        const typeMatch = queryByTestId('pokemon-type');
        expect(allButton).toBeInTheDocument();
        expect(typeMatch.innerHTML).toBe(type);
      });
    });
  });
  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, queryByTestId } = renderWithRouter(<App />);
    const allButton = getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();
    const buttonType = getByRole('button', {
      name: 'Psychic',
    });
    fireEvent.click(buttonType);
    fireEvent.click(allButton);
    const checkFirstPokemon = queryByTestId('pokemon-name');
    expect(checkFirstPokemon.innerHTML).toBe('Pikachu');
    const pokedexButton = getByRole('button', {
      name: nextPokemonString,
    });
    expect(pokedexButton).toBeInTheDocument();
    fireEvent.click(pokedexButton);
    expect(checkFirstPokemon.innerHTML).toBe('Charmander');
    expect(allButton).toBeInTheDocument();
  });
  it(`Testa se o botão de Próximo pokémon é desabilitado
    quando a lista de Pokémons tiver um só pokémon`, () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonType = getByRole('button', {
      name: 'Poison',
    });
    fireEvent.click(buttonType);
    const pokedexButton = getByRole('button', {
      name: nextPokemonString,
    });
    expect(pokedexButton.disabled).toBe(true);
  });
  it('Testa se os botões são criados dinamicamente', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const numberofTypeButtons = 7;
    const buttons = queryAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(numberofTypeButtons);
  });
});
