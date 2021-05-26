import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Requirement 7', () => {
  it('Verify details of a pokemon and summary', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();

    fireEvent.click(detailsLink);
    const pokeDetail = getByText(/pikachu details/i);
    expect(pokeDetail).toBeInTheDocument();

    const summary = getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();

    const summaryText = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(summaryText).toBeInTheDocument();

    const locationGame = getByRole('heading', {
      level: 2,
      name: /Game Locations of/i,
    });
    expect(locationGame).toBeInTheDocument();
  });

  it('Check locations', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(detailsLink);

    const imgLocations = getAllByAltText(/pikachu location/i);
    expect(imgLocations.length).toBeGreaterThan(0);

    const src = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(imgLocations[0]).toHaveAttribute('src', src);
  });

  it('test to checkbox of add favorite pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(detailsLink);

    const checkFavorite = getByRole('checkbox');
    expect(checkFavorite).toBeInTheDocument();
    const favoritePokemon = getByText(/Pokémon favoritado/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
