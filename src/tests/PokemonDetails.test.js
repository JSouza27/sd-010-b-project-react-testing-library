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

const { id, name, summary, foundAt } = ekans;
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

  it(`A seção de detalhes deve conter um parágrafo com o
resumo do Pokémon específico sendo visualizado`, () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isFavoritePokemons }
        match={ { params: { id: parsedId } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          updateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    const summaryParagraph = getByText(summary);
    expect(summaryParagraph).toBeInTheDocument();
  });
});

describe(`Teste se existe na página uma seção com os mapas
contendo as localizações do pokémon`, () => {
  it(`Na seção de detalhes deverá existir um heading h2 com o texto
Game Locations of <name>; onde <name> é o nome do Pokémon exibido`, () => {
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
    const headingGameLocations = getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(headingGameLocations).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const { getAllByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isFavoritePokemons }
        match={ { params: { id: parsedId } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          updateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    const imgsGameLocations = getAllByRole('img', { name: `${name} location` });
    expect(imgsGameLocations).toHaveLength(foundAt.length);
  });

  it(`Devem ser exibidos, o nome da localização e
uma imagem do mapa em cada localização`, () => {
    const { getByRole, getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isFavoritePokemons }
        match={ { params: { id: parsedId } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          updateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    foundAt.forEach(({ location }) => {
      const imgGameLocation = getByRole('img', { name: `${name} location` });
      const nameGameLocation = getByText(location);
      expect(imgGameLocation).toBeInTheDocument();
      expect(nameGameLocation).toBeInTheDocument();
    });
  });
});
