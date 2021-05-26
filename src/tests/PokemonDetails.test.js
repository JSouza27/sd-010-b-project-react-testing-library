import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

describe('testing the pokemonDetails component', () => {
  it('Testing details about a pokemon', () => {
    const { getByTestId, getByRole, getByText, history } = renderWithRouter(<App />);
    const goToDetails = getByRole('link', {
      name: 'More details',
    });

    expect(goToDetails).toBeInTheDocument();
    userEvent.click(goToDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonSummary = getByText(data[0].summary);
    const summary = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
    expect(goToDetails).not.toBeInTheDocument();
  });

  it('Check if there is a section with the locations of the pokemon on the map', () => {
    const { getByRole, getAllByAltText, history } = renderWithRouter(<App />);
    const goToDetails = getByRole('link', {
      name: 'More details',
    });

    expect(goToDetails).toBeInTheDocument();
    userEvent.click(goToDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const [
      firstPikachuLocation,
      secondPikachuLocation,
    ] = getAllByAltText('Pikachu location');

    const gameLocationPikachu = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    expect(gameLocationPikachu).toBeInTheDocument();
    expect(firstPikachuLocation).toBeInTheDocument();
    expect(secondPikachuLocation).toBeInTheDocument();
  });
});
