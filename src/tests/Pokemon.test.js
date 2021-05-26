import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('requisito 6', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };

  test('card pokemon have correct details', () => {
    const isTruePokemon = true;
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isTruePokemon }
      />,
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    const img = screen.getByAltText('Pikachu sprite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('pokemon card has redirect link to page of details pokemons', () => {
    const isTruePokemon = true;
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isTruePokemon }
      />,
    );

    const link = screen.getByText('More details');
    expect(link).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');

    // porque as informções não aparecem?
  });

  test('the favorite pokemon has a start', () => {
    const isTruePokemon = true;
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isTruePokemon }
      />,
    );

    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});

// como pegar o link: https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
