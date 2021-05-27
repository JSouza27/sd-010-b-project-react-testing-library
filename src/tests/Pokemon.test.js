import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import data from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
const pokemon = data[0];

describe('Test if a card with the information of a certain Pokémon is rendered', () => {
  it('The correct name of the Pokémon should be shown on the screen', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById[pokemon.id] }
      />,
    );
    expect(getByText(pokemon.name)).toHaveTextContent(pokemon.name);
  });

  it('The correct type of pokémon should be shown on the screen.', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById[pokemon.id] }
      />,
    );
    expect(getByText(pokemon.type)).toHaveTextContent(pokemon.type);
  });

  it('The average weight of the Pokémon should be displayed with text in the format '
  + 'Average weight: <value> <measurementUnit>; where <value> and <measurementUnit> are,'
  + ' respectively, the average weight of the pokémon and its unit of measurement.',
  () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById[pokemon.id] }
      />,
    );
    expect(getByText(/Average weight/i))
      .toHaveTextContent(
        `Average weight: ${pokemon.averageWeight.value} ${pokemon
          .averageWeight.measurementUnit}`,
      );
  });

  it('The Pokémon image should be displayed. '
  + 'It must contain a src attribute with the image URL '
  + 'and an alt attribute with the text <name> sprite,'
  + ' where <name> is the name of the pokémon;', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById[pokemon.id] }
      />,
    );
    expect(getByRole('img').src).toBe(pokemon.image);
    expect(getByRole('img').alt).toBe(`${pokemon.name} sprite`);
  });
});

test('Test whether the Pokémon card indicated on the Pokédex contains '
  + 'a navigation link to view details of this Pokémon.'
  + ' The link must have the URL / pokemons / <id>,'
  + ' where <id> is the id of the Pokémon displayed',
() => {
  const { getByText, history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemon }
      isFavorite={ isPokemonFavoriteById[pokemon.id] }
    />,
  );
  history.push('/pokemons');
  expect(getByText(/more details/i).href).toBe(`http://localhost${history.location.pathname}/${pokemon.id}`);
});

test('Test if clicking on the Pokémon navigation link redirects'
+ ' the application to the Pokémon details page.', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemon }
      isFavorite={ isPokemonFavoriteById[pokemon.id] }
    />,
  );
  history.push(`pokemon/${pokemon.id}`);
  expect(getByText(/more details/i)).toBeInTheDocument();
});

test('Also test if the URL displayed in the browser changes to / pokemon / <id>,'
+ ' where <id> is the id of the Pokémon whose details you want to see', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemon }
      isFavorite={ isPokemonFavoriteById[pokemon.id] }
    />,
  );
  fireEvent.click(getByText(/more details/i));
  expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
});
