import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('tests the Pokemon component', () => {
  it('tests if it render the information about a determined pokemon', () => {
    const pikachu = pokemons[0];
    const { getByText, getByRole } = renderWithRouter(<Pokemon
      isFavorite={ false }
      pokemon={ pikachu }
    />);
    const pokeName = getByText(/Pikachu/i);
    const pokeType = getByText(/Electric/i);
    const { value, measurementUnit } = pikachu.averageWeight;
    const pokeWeigth = getByText(`Average weight: ${value} ${measurementUnit}`);
    const pokeImg = getByRole('img');
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeigth).toBeInTheDocument();
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg.outerHTML).toContain(pikachu.image);
    expect(pokeImg.outerHTML).toContain(`${pikachu.name} sprite`);
  });
  it('tests if there is a nav link to pokemonDetails and if it works', () => {
    const pikachu = pokemons[0];
    const { getByText, history } = renderWithRouter(<Pokemon
      isFavorite={ false }
      pokemon={ pikachu }
    />);
    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pikachu.id}`);
  });
  it('tests if when the pokemon is favorited it shows the favorited logo', () => {
    const pikachu = pokemons[0];
    const { getAllByRole } = renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pikachu }
    />);
    const allImgs = getAllByRole('img');
    const favoriteIcon = allImgs[1];
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.outerHTML).toContain('src="/star-icon.svg"');
    const expectedAld = `alt="${pikachu.name} is marked as favorite"`;
    expect(favoriteIcon.outerHTML).toContain(expectedAld);
  });
});
