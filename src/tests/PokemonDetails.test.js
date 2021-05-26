import React from 'react';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import * as service from '../services/pokedexService';

const pikachu = pokemons[0];
const isFavorite = pokemons.reduce((acc, curr) => {
  acc[curr.id] = false;
  return acc;
}, {});
const match = { params: { id: pikachu.id.toString() } };

describe('tests the PokemonDetails component', () => {
  it('tests if the detailed informations about the selected Pokemon are shown', () => {
    const { getByText, getAllByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isFavorite }
      pokemons={ pokemons }
      match={ match }
      onUpdateFavoritePokemons={ service.updateFavoritePokemons }
    />);
    const pikachuDetails = getByText(`${pikachu.name} Details`);
    const summary = getByText(/summary/i);
    const detailsParagraph = getByText(`${pikachu.summary}`);
    expect(pikachuDetails).toBeInTheDocument();
    expect(getAllByText(/details/i)).toHaveLength(1);
    expect(summary).toBeInTheDocument();
    expect(summary.nodeName).toBe('H2');
    expect(detailsParagraph).toBeInTheDocument();
  });
  it('tests if there is a section with the maps with the pokemon locations', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isFavorite }
      pokemons={ pokemons }
      match={ match }
      onUpdateFavoritePokemons={ service.updateFavoritePokemons }
    />);
    const pikachuLocationsHeader = getByText(`Game Locations of ${pikachu.name}`);
    const pikachuLocations = getAllByAltText(`${pikachu.name} location`);
    expect(pikachuLocationsHeader).toBeInTheDocument();
    expect(pikachuLocationsHeader.nodeName).toBe('H2');
    expect(pikachuLocations).toHaveLength(pikachu.foundAt.length);
    const firstLocation = getByText(`${pikachu.foundAt[0].location}`);
    const secondLocation = getByText(`${pikachu.foundAt[1].location}`);
    expect(pikachuLocations[0].nextElementSibling).toBe(firstLocation.parentElement);
    expect(pikachuLocations[1].nextElementSibling).toBe(secondLocation.parentElement);
    expect(pikachuLocations[0].outerHTML).toContain(`src="${pikachu.foundAt[0].map}"`);
    expect(pikachuLocations[1].outerHTML).toContain(`src="${pikachu.foundAt[1].map}"`);
  });
});
