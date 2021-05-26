import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 151,
  name: 'Mew',
  type: 'Psychic',
  averageWeight: {
    value: '4.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Faraway Island',
      map: 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
    },
  ],
  summary:
    `Apparently, it appears only to those people who 
    are pure of heart and have a strong desire to see it.`,
};
describe('Test "Pokemon" component', () => {
  it('renders pokemon card with pokemon\'s info ', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    const name = getByTestId('pokemon-name').textContent;
    const type = getByTestId('pokemon-type').textContent;
    const weight = getByTestId('pokemon-weight').textContent;
    const image = getByRole('img', { name: `${pokemon.name} sprite` });
    const {
      averageWeight: { value, measurementUnit },
    } = pokemon;
    const { src, alt } = image;

    expect(name).toBe(pokemon.name);
    expect(type).toBe(pokemon.type);
    expect(weight).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(src).toBe(pokemon.image);
    expect(alt).toBe(`${pokemon.name} sprite`);
  });

  it('renders pokemon\'s details link with correct id path', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );

    const link = getByRole('link', { name: 'More details' });
    const { href } = link;

    expect(href).toBe(`http://localhost/pokemons/${pokemon.id}`);
  });

  it('corresponding path for pokemon when click on "More details"', () => {
    const { history, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    const link = getByRole('link', { name: 'More details' });
    let {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/');

    userEvent.click(link);
    pathname = history.location.pathname;

    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('check with there is a image of a star on a favorite pokemon', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite />,
    );
    const star = getByRole('img', { name: /favorite/ });

    const { src, alt } = star;

    expect(src).toBe('http://localhost/star-icon.svg');
    expect(alt).toBe(`${pokemon.name} is marked as favorite`);
  });
});
