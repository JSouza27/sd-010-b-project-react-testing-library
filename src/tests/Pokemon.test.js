import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const POKEMON = {
  id: 78,
  name: 'Rapidash',
  type: 'Fire',
  averageWeight: {
    value: '95.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Route 28',
      map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
    },
    {
      location: 'Johto Mount Silver',
      map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
    },
  ],
  summary: '...',
};

describe('Testing Pokemon.js', () => {
  const MORE_DETAILS = 'More details';

  it('Verifies if the pokemon have the correct info', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite={ false }
    />);
    const pokemonName = getByText('Rapidash');
    const pokemonType = getByText('Fire');
    const averageWeight = getByText('Average weight: 95.0 kg');
    const pokemonImg = getByRole('img');
    const pokemonImgSrc = 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png';
    const pokemonImgAlt = 'Rapidash sprite';

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
    expect(pokemonImg.src).toBe(pokemonImgSrc);
    expect(pokemonImg.alt).toBe(pokemonImgAlt);
  });

  it('Verifies if have a details link and if it directs to the right location', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite={ false }
    />);

    const detailsLink = getByRole('link', {
      name: MORE_DETAILS,
    });

    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toMatch(/pokemons\/78/i);
  });

  it('Verifies if clicking at details link, redirects to Details page', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', {
      name: MORE_DETAILS,
    });

    userEvent.click(detailsLink);

    const pokemonDetails = getByText('Pikachu Details');

    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Verifies if clicking on details link it redirects to the right location', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite={ false }
    />);

    const detailsLink = getByRole('link', {
      name: MORE_DETAILS,
    });

    userEvent.click(detailsLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/pokemons/78');
  });

  it('Verifies if have a star in favorited pokemons', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite
    />);

    const images = getAllByRole('img');
    const favoriteStar = images[1];

    expect(favoriteStar.src).toMatch(/star-icon.svg/i);
    expect(favoriteStar.alt).toBe('Rapidash is marked as favorite');
  });
});
