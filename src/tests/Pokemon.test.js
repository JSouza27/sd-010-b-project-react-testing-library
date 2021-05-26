// import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const getPikachu = pokemons.filter((pokemon) => pokemon.name === 'Pikachu');
const { averageWeight, image, name, type, id } = getPikachu[0];
const { value, measurementUnit } = averageWeight;

describe('testing component Pokemon.js', () => {
  test('shows card info pokémons', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name', { name: `${name}` });
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    const pokemonType = getByTestId('pokemon-type', { name: `${type}` });
    expect(pokemonType).toHaveTextContent(/electric/i);
    const pokemonWeight = getByTestId('pokemon-weight', {
      name: `Average weight: ${value} ${measurementUnit}`,
    });
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    const pokemonImage = getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', `${image}`);
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('link details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkDetails = getByText(/more details/i);
    expect(linkDetails).toBeInTheDocument();
    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
    const textDatails = getByText(`${name} Details`);
    expect(textDatails).toBeInTheDocument();
  });

  test('icon favorite', () => {
    // rolé para marcar o favorito
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByRole('checkbox'));
    // capturar o icone e verificar se ele está na pagina
    const favoriteIcon = getByRole('img', { name: `${name} is marked as favorite` });
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
