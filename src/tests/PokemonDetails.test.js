import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testing the PokemonDetails.js', () => {
  test('if the page has pokemon details', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: /more details/i,
    });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const titleDetails = getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(titleDetails).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    const titleSummary = getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(titleSummary).toBeInTheDocument();
    const summaryContent = getByText(/This intelligent Pokémon/i);
    expect(summaryContent).toBeInTheDocument();
  });

  test('if the page has maps with locations of the pokemon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: 'More details',
    });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const titleLocations = getByRole('heading', {
      name: 'Game Locations of Pikachu',
    });
    expect(titleLocations).toBeInTheDocument();
    const locations = getAllByAltText('Pikachu location');
    expect(locations.length).toBe(2);
    expect(locations).toBeDefined();
    expect(locations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const location1 = getByText(/kanto viridian forest/i);
    expect(location1).toBeInTheDocument();
    const location2 = getByText(/kanto power plant/i);
    expect(location2).toBeInTheDocument();
  });

  test('if the user can select a favorite pokemon in this page', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: 'More details',
    });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const isFavorite = getByLabelText(/pokémon favoritado/i);
    expect(isFavorite).toBeInTheDocument();
    const check = getByRole('checkbox');
    expect(check).toBeInTheDocument();
    fireEvent.click(check);
    const star = getByAltText(/pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    fireEvent.click(check);
    expect(star).not.toBeInTheDocument();
  });
});
