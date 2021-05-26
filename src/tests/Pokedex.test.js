import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const nextButton = getByRole('button', {
      name: /Próximo pokémon/i,
    })
    expect(nextButton).toBeInTheDocument();

    const allPokemons = pokemons.reduce((pokemonAcc, pokemon) => {
      return [...pokemonAcc, pokemon.name];
    }, []);

    allPokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
    });

    const firstPokemon = getByText(allPokemons[0]);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Se a Pokédex tem os botões de filtro.', () => {
    const { getByRole, getAllByText } = renderWithRouter(<App />);

    const allTypes = pokemons.reduce((typeAcc, pokemon) => {
      return typeAcc.includes(pokemon.type) ? typeAcc : [...typeAcc, pokemon.type];
    }, []);

    allTypes.forEach((type) => {
      const typedButton = getByRole('button', { name: type });
      userEvent.click(typedButton);
      expect(getAllByText(type)[0]).toBeInTheDocument();
    })
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);

    const allButton = getByRole('button', {
      name: /all/i,
    });
    
    expect(allButton).toBeInTheDocument();
  });
})