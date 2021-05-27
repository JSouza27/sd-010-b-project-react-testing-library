import React from 'react';
import { fireEvent } from '@testing-library/react';

import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente "Pokemon"', () => {
  test('Verifica se o cart impresso tem as informações corretas', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    const pokemonWeightString = `Average weight: ${value} ${measurementUnit}`;

    const pokemonName = getByText(name);
    const pokemonType = getByText(type);
    const pokemonWeight = getByText(pokemonWeightString);
    const pokemonImage = getByRole('img', {
      src: image,
    });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(pokemonWeightString);
    expect(pokemonImage).toHaveAttribute('src', image);
    expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
  });

  test('Verifica se o ícone de favorito aparece no card dos pokemons favoritados', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const iconSrc = '/star-icon.svg';
    const iconAlt = `${pokemons[0].name} is marked as favorite`;

    const favoriteIcon = getByAltText(iconAlt);

    expect(favoriteIcon).toHaveAttribute('src', iconSrc);
    expect(favoriteIcon).toHaveAttribute('alt', iconAlt);
  });

  test('', () => {
    const { history, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const moreDetailsButton = getByRole('link', {
      name: 'More details',
    });

    fireEvent.click(moreDetailsButton);

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
});
