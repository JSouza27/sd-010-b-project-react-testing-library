import React from 'react';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: `This intelligent Pokémon roasts hard berries with electricity 
    to make them tender enough to eat.`,
  }];

const pokemon = pokemons[0];

const favorites = { [pokemon.id]: false };

describe('Test "PokemonDetails" component', () => {
  it('renders selected pokemon\'s info', () => {
    const { getByRole, getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favorites }
        match={ { params: { id: pokemon.id.toString() } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const title = getByRole('heading', {
      level: 2,
      name: `${pokemon.name} Details`,
    }).textContent;
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    }).textContent;
    const resume = getByText(
      /This intelligent Pokémon roasts hard berries with electricity/i,
    ).textContent;

    expect(title).toBe(`${pokemon.name} Details`);
    expect(summary).toBe('Summary');
    expect(resume).toBe(pokemon.summary);
  });

  it('renders pokemon\'s location info', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favorites }
        match={ { params: { id: pokemon.id.toString() } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const title = getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemon.name}`,
    }).textContent;
    expect(title).toBe('Game Locations of Pikachu');

    const locations = getAllByAltText(`${pokemon.name} location`);
    const numLocations = pokemon.foundAt.length;

    expect(locations).toHaveLength(numLocations);
    locations.forEach(({ src, alt }, index) => {
      expect(alt).toBe(`${pokemon.name} location`);
      expect(src).toBe(pokemon.foundAt[index].map);
    });
  });

  it('checks if user can mark pokemon as favorite', () => {
    const { getByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favorites }
        match={ { params: { id: pokemon.id.toString() } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const check = getByRole('checkbox', { name: 'Pokémon favoritado?' });

    expect(check).toBeInTheDocument();
  });
});
