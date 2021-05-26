import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

describe('testing the pokemonDetails component', () => {
  const MoreDetails = 'More details';
  it('Testing details about a pokemon', () => {
    const { getByTestId, getByRole, getByText, history } = renderWithRouter(<App />);
    const goToDetails = getByRole('link', {
      name: MoreDetails,
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
    const pageTitle = getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });

    expect(pageTitle).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
    expect(goToDetails).not.toBeInTheDocument();

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Check if there is a section with the locations of the pokemon on the map', () => {
    const {
      getByRole,
      getAllByAltText,
      getByText,
      history,
    } = renderWithRouter(<App />);

    const goToDetails = getByRole('link', {
      name: MoreDetails,
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

    const [firstLocationObj, secondLocationObj] = data[0].foundAt;
    const { location: firstLocation, map: firstSrcName } = firstLocationObj;
    const { location: secondLocation, map: secondSrcName } = secondLocationObj;
    const firstLocationName = getByText(firstLocation);
    const secondLocationName = getByText(secondLocation);

    expect(gameLocationPikachu).toBeInTheDocument();
    expect(firstPikachuLocation).toBeInTheDocument();
    expect(secondPikachuLocation).toBeInTheDocument();
    expect(firstLocationName).toBeInTheDocument();
    expect(secondLocationName).toBeInTheDocument();
    expect(firstPikachuLocation.src).toBe(firstSrcName);
    expect(secondPikachuLocation.src).toBe(secondSrcName);
  });

  it('Test the checkbox favorite funcionality', () => {
    const {
      getByLabelText,
      getByRole,
      getByText,
      getByAltText,
    } = renderWithRouter(<App />);
    const goToDetails = getByRole('link', {
      name: MoreDetails,
    });

    expect(goToDetails).toBeInTheDocument();
    expect(goToDetails).toHaveTextContent(MoreDetails);
    userEvent.click(goToDetails);

    const checkBoxText = getByText('Pokémon favoritado?');
    expect(checkBoxText).toBeInTheDocument();
    expect(checkBoxText).toHaveTextContent('Pokémon favoritado?');

    const checkBoxElement = getByLabelText(checkBoxText.textContent);
    expect(checkBoxElement).toBeInTheDocument();
    userEvent.click(checkBoxElement);

    const goldenStar = getByAltText('Pikachu is marked as favorite');
    expect(goldenStar).toBeInTheDocument();

    userEvent.click(checkBoxElement);
    expect(goldenStar).not.toBeInTheDocument();
  });
});
