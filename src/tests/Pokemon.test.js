import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';

import { Pokemon } from '../components';

describe('Requisito 06 = Pokemon.js', () => {
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

  test('Teste se é renderizado um card com as informações do pokémon.', () => {
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

  test('Teste se o card do Pokémon indicado contém um link de navegação.', () => {
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
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
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
