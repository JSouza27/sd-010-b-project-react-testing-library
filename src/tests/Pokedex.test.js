import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('Testando o componente Pokedex', () => {
  const BUTTON_NAME = 'Próximo pokémon';
  it('Testa se página contém um heading `h2` com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading.innerHTML).toBe('Encountered pokémons');
  });

  it('Testa se é exibido próximo Pokémon se o botão Próximo pokémon é clicado', () => {
    const isPokemonFavoriteById = [];
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const button = getByRole('button', { name: BUTTON_NAME });

    expect(button).toBeInTheDocument();
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('Testa o botão Próximo pokémon', () => {
    const isPokemonFavoriteById = [];
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const button = getByRole('button', { name: BUTTON_NAME });

    expect(button).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    // Solução do aluno Jonathan Souza - Turma 10 - Tribo B.
    const isPokemonFavoriteById = [];
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const button = getByRole('button', { name: BUTTON_NAME });

    expect(button).toBeInTheDocument();

    pokemons.forEach((poke) => {
      expect(getByText(poke.name)).toBeInTheDocument();
      fireEvent.click(button);
    });
  });

  it('testa se clicando no botão, volta para o primeiro pokemon', () => {
    const isPokemonFavoriteById = [];
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const button = getByRole('button', { name: BUTTON_NAME });

    expect(button).toBeInTheDocument();

    pokemons.forEach(() => {
      fireEvent.click(button);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Testa se tem um pokemon por vez', () => {
    const isPokemonFavoriteById = [];
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const button = getByRole('button', { name: BUTTON_NAME });

    fireEvent.click(button);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('Testa se tem os botões de filtro na pokedex', () => {
    const number = 7;
    const isPokemonFavoriteById = [];
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const button = getAllByTestId('pokemon-type-button');

    expect(button).toHaveLength(number);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const isPokemonFavoriteById = [];
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const buttonAll = getByRole('button', { name: 'All' });

    expect(buttonAll).toBeInTheDocument();

    fireEvent.click(buttonAll);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Testa se é criado dinamicamente, um botão filtro para cada tipo de Pokémon', () => {
    const isPokemonFavoriteById = [];
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    pokemons.forEach((pokemon) => {
      const typesPokemons = getByRole('button', { name: pokemon.type });
      expect(typesPokemons).toBeInTheDocument();
    });
  });
});
