import { screen } from '@testing-library/dom';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('requisiot 3', () => {
  test('not have favorite pokemons show "No favorite pokemon found" ', () => {
    renderWithRouter(<FavoritePokemons />);

    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
    // find Pokemons card with names
    expect(screen.queryByText('Pikachau')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('Caterpie')).not.toBeInTheDocument();
  });

  test('show card favorite pokemon', () => {
    const favoritePokemons = [
      { id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    expect(screen.queryByText('No favorite pokemon found')).not.toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    const img = screen.getByAltText('Pikachu sprite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
