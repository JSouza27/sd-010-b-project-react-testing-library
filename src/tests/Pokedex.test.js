import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const newObject = {
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
  it('Renderiza um h2 na página com o texto: Encountered pokémons.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ newObject }
    />);

    const screenTitle = screen.getByText(/encountered pokémons/i);

    expect(screenTitle).toBeInTheDocument();
  });

  it('Renderiza o proximo pokemon quando é clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ newObject }
    />);

    const getNextButton = screen.getByText(/próximo pokémon/i);
    const magicNumber = 8;

    for (let index = 0; index < magicNumber; index += 1) {
      const getPokemon = screen.getByText(pokemons[index].name);
      expect(getPokemon).toBeInTheDocument();
      userEvent.click(getNextButton);
    }
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ newObject }
    />);
    const numb = 1;

    const getPokemonId = screen.getAllByTestId('pokemon-name');
    expect(getPokemonId.length).toBe(numb);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ newObject }
    />);

    const buttonsName = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    for (let index = 0; index < buttonsName.length; index += 1) {
      const getButton = screen.getByRole('button', {
        name: buttonsName[index],
      });
      expect(getButton).toBeInTheDocument();
    }

    const getFire = screen.getByRole('button', {
      name: /fire/i,
    });

    userEvent.click(getFire);

    const getNextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(getNextButton);

    const getName = screen.getByText('Rapidash');
    expect(getName).toBeInTheDocument();

    expect(getFire).toHaveTextContent('Fire');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ newObject }
    />);

    const resetButton = screen.getByRole('button', {
      name: 'All',
    });

    expect(resetButton).toBeInTheDocument();

    userEvent.click(resetButton);

    const getCharm = screen.getByText('Charmander');
    expect(getCharm).toBeInTheDocument();
  });

  it('Teste se é criado dinamicamente um botão de filtro para cada Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ newObject }
    />);

    const arrayButtons = screen.getAllByTestId('pokemon-type-button');
    arrayButtons.forEach((currentValue) => {
      expect(currentValue).toBeInTheDocument();
    });

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(buttonAll).toBeInTheDocument();
  });

  it('O botão de Próximo deve ser desabilitado se a lista tiver um só pokémon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ newObject }
    />);

    const bugButton = screen.getByRole('button', {
      name: /bug/i,
    });

    userEvent.click(bugButton);

    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(nextButton.disabled).toBe(true);
    // expect(nextButton).toBeDisabled();
  });
});
