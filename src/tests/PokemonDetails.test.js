import React from 'react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import { updateFavoritePokemons } from '../services/pokedexService';

const [
  pikachu, charmander, caterpie, ekans, alakazam, mew, rapidash, snorlax, dragonair,
] = pokemons;

const isFavoritePokemons = {
  [pikachu.id]: false,
  [charmander.id]: false,
  [caterpie.id]: false,
  [ekans.id]: false,
  [alakazam.id]: false,
  [mew.id]: false,
  [rapidash.id]: false,
  [snorlax.id]: false,
  [dragonair.id]: false,
};

const { id, name } = ekans;
const parsedId = id.toString();

describe(`Teste se as informações detalhadas do Pokémon
selecionado são mostradas na tela`, () => {
  it(`A página deve conter um texto <name> Details,
onde <name> é o nome do Pokémon`, () => {
    const { getByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isFavoritePokemons }
        match={ { params: { id: parsedId } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          updateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    const heading2 = getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(heading2).toBeInTheDocument();
  });

  it(`Não deve existir o link de navegação
para os detalhes do Pokémon selecionado.`, () => {
    const { queryByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isFavoritePokemons }
        match={ { params: { id: parsedId } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          updateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    const moreDetails = queryByRole('link', { name: 'More details' });
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isFavoritePokemons }
        match={ { params: { id: parsedId } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          updateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    const heading2 = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(heading2).toBeInTheDocument();
  });
});
