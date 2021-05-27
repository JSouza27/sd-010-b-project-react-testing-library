import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

const infoPikachu = {
  id: 25,
  name: 'Pikachu',
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
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
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

describe('Test the component ṔokemonDetails ', () => {
  test('renders the details of the pokemon', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);

    const pathPokemonId =  history.location.pathname;
    expect(pathPokemonId).toBe(`/pokemons/${infoPikachu.id}`);

    const h2 = getByRole('heading', {
      name: `${infoPikachu.name} Details`,
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  test('not must a link to pokemons details', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);

    const pathPokemonId =  history.location.pathname;
    expect(pathPokemonId).toBe(`/pokemons/${infoPikachu.id}`);

    expect(linkDetails).not.toBeInTheDocument();
  });

  test('the details section must to have a heading h2 with a text "Summary" ', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);

    const pathPokemonId =  history.location.pathname;
    expect(pathPokemonId).toBe(`/pokemons/${infoPikachu.id}`);

    const summary = getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(summary).toBeInTheDocument();
  });

  test('the details section must to have a paragrafh about the pokemon', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);

    const pathPokemonId =  history.location.pathname;
    expect(pathPokemonId).toBe(`/pokemons/${infoPikachu.id}`);

    const aboutPokemon = getByText(infoPikachu.summary);
    expect(aboutPokemon).toBeInTheDocument();
  });

  test('renders a section with the maps about location of the pokemons', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);

    const pathPokemonId =  history.location.pathname;
    expect(pathPokemonId).toBe(`/pokemons/${infoPikachu.id}`);

    const gameLocation = getByRole('heading', { 
      level: 2,
      name: `Game Locations of ${infoPikachu.name}`,
    });
    expect(gameLocation).toBeInTheDocument();
  });

  test('renders of all of the locations', () => {
    const { foundAt } = infoPikachu;
    const { getAllByRole, getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);

    const pathPokemonId =  history.location.pathname;
    expect(pathPokemonId).toBe(`/pokemons/${infoPikachu.id}`);

    const locationMap = getAllByRole('img', { name: `${infoPikachu.name} location` });
    expect(locationMap[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' );
    expect(locationMap[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' );
  });

  test('check if the user can save your favorite pokemon', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /more details/i });
    fireEvent.click(linkDetails);

    const pathPokemonId =  history.location.pathname;
    expect(pathPokemonId).toBe(`/pokemons/${infoPikachu.id}`);

    const checkbox = getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
  });
});
