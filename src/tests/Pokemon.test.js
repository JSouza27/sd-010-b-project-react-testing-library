import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const caterpie = pokemons[2];
const isPokemonFavoriteById = {};

describe('Checks Pokemon', () => {
  it('Test whether a card is rendered with your information.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ caterpie }
        isFavorite={ isPokemonFavoriteById }
      />,
    );

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon.textContent).toBe('Caterpie');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon.textContent).toBe('Bug');

    const weightPokemon = screen.getByText('Average weight: 2.9 kg');
    expect(weightPokemon).toBeInTheDocument();
    expect(weightPokemon.textContent).toBe('Average weight: 2.9 kg');

    const imagePokemon = screen.getByAltText('Caterpie sprite');
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon).toHaveAttribute('alt');
    expect(imagePokemon.alt).toBe('Caterpie sprite');
    expect(imagePokemon).not.toHaveAttribute('src', '');
  });

  it('Test if the Pokemon card contains a link to more information', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ caterpie }
        isFavorite={ isPokemonFavoriteById }
      />,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('Test if the path change when you click on the link', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ caterpie }
        isFavorite={ isPokemonFavoriteById }
      />,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/10');
  });
  it('Test if there is a star icon on favorite Pokémon', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ caterpie }
        isFavorite={ isPokemonFavoriteById }
      />,
    );

    const starIcon = screen.getByAltText('Caterpie is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toMatch('/star-icon.svg');
    expect(starIcon.alt).toBe('Caterpie is marked as favorite');
  });
});
