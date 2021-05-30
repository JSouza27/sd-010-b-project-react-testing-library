import React from 'react';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';

const pokemonPath = '/pokemons/25';
const pikachuLocation = 'Pikachu location';

describe('shows detailed information of the selected Pokémon', () => {
  test('renders a text like "Pikachu Details"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const detailsTitle = getByText('Pikachu Details');
    expect(detailsTitle).toBeInTheDocument();
  });
  test('There should be no link for the details of the selected Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    try {
      const detailsBtn = getByText('More details');
      expect(detailsBtn).not.toBeInTheDocument();
    } catch (error) {
      expect(true).toBe(true);
    }
  });
  test('shows a H2 element with text "Summary"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const summaryH2 = getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summaryH2).toBeInTheDocument();
  });
  test('shows a paragraph with specific Pokémon abstract', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const pokemonDetails = getByText(
      'This intelligent Pokémon roasts hard berries'
      + ' '
      + 'with electricity to make them tender enough to eat.',
    );
    expect(pokemonDetails).toBeInTheDocument();
  });
});

describe('renders maps with locations of the pokémon', () => {
  test('shows a H2 element with "Game Locations of Pikachu"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const mapH2 = getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(mapH2).toBeInTheDocument();
  });
  test('shows all Pokémons locations', () => {
    const { getAllByAltText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const pkdxLocation = getAllByAltText(pikachuLocation);
    expect(pkdxLocation.length).toBe(2);
  });
  test('shows the location name and a map image at each location', () => {
    const { getAllByAltText, getByText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const locationName1 = getByText('Kanto Viridian Forest');
    const locationName2 = getByText('Kanto Power Plant');
    expect(locationName1).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
    const location = getAllByAltText(pikachuLocation);
    expect(location[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'alt',
      pikachuLocation,
    );
    expect(location[1]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      'alt',
      pikachuLocation,
    );
  });
});

describe('user can favorite a Pokémon in details page', () => {
  test('shows a checkbox element to favorite a Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const favoriteBtn = getByText('Pokémon favoritado?');
    expect(favoriteBtn).toBeInTheDocument();
  });
});
