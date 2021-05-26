import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const getPikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu');
const { name, summary, foundAt } = getPikachu[0];
const locations = foundAt.map(({ location }) => location);
const maps = foundAt.map(({ map }) => map);
const DATAILS = 'More details';

describe('testing component PokemonsDetails.js', () => {
  test('shows infos pokemon in page details', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(DATAILS));
    const textDatails = getByText(`${name} Details`);
    expect(textDatails).toBeInTheDocument();
    const summaryDetails = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryDetails).toBeInTheDocument();
    expect(getByText(`${summary}`)).toBeInTheDocument();
  });

  test('shows maps in page details', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(DATAILS));
    const textDatails = getByText(`Game Locations of ${name}`);
    expect(textDatails).toBeInTheDocument();
    // feito com ajuda de Herique Zozimo
    locations.forEach((locati) => expect(getByText(locati)).toBeInTheDocument());
    const image = getAllByRole('img');
    const src = image.map((img) => img.src);
    maps.forEach((map) => expect(src).toContain(map));
    const alt = image.map((img) => img.alt);
    expect(alt).toContain(`${name} location`);
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
