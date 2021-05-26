import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const getPikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu');
const { name, summary } = getPikachu[0];

const DATAILS = 'More details';

describe('testing component PokemonsDetails.js', () => {
  test('shows infos pokemon in page details', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(DATAILS));
    const textDatails = getByText(`${name} Details`);
    expect(textDatails).toBeInTheDocument();
    // const linkDetails = getByRole('link', { name: DATAILS });
    const summaryDetails = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryDetails).toBeInTheDocument();
    expect(getByText(`${summary}`)).toBeInTheDocument();
  });

  test('shows maps in page details', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(DATAILS));
    const textDatails = getByText(`Game Locations of ${name}`);
    expect(textDatails).toBeInTheDocument();
  });

  test('if user can favorite pokemon', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(DATAILS));
    const textFavorite = getByText('Pokémon favoritado?');
    expect(textFavorite).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    fireEvent.click(getByText(/favorite pokémons/i));
    const pokemon = getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
    fireEvent.click(getByText(DATAILS));
    fireEvent.click(checkbox);
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(pokemon).not.toBeInTheDocument();
    fireEvent.click(getByText(DATAILS));
  });
});
