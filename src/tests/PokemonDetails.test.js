import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('test PokemonDetails component', () => {
  test('if pokemon details are displayed on screen', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText('Pokédex');
    expect(heading).toBeInTheDocument();
    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(moreDetails).not.toBeInTheDocument();
    const sumario = getByText('Summary');
    expect(sumario).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon roasts hard/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('game locations', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const heading = getByRole('heading',
      { name: 'Game Locations of Pikachu' },
      { level: 2 });
    expect(heading).toBeInTheDocument();
    const allPikachuLocations = getAllByAltText('Pikachu location');
    expect(allPikachuLocations[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allPikachuLocations[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(allPikachuLocations.length).toBe(2);
    const location1 = getByText('Kanto Viridian Forest');
    expect(location1).toBeInTheDocument();
    const location2 = getByText('Kanto Power Plant');
    expect(location2).toBeInTheDocument();
  });

  test('if user can favorite pokemon throgh detail page', () => {
    const { getByText, getByRole, getByAltText, history } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const textFavoritePokemon = getByText('Pokémon favoritado?');
    expect(textFavoritePokemon).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    const favorite = getByAltText('Pikachu is marked as favorite');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(favorite).not.toBeInTheDocument();
  });
});
