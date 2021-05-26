import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';

import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Testa componente Pokemon', () => {
  const pokemons = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { queryByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons } isFavorite={ false } />,
    );
    const pokemonName = queryByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = queryByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonWeight = queryByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/'
    + 'Spr_5b_025_m.png');
  });
  it('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { queryByRole, history } = renderWithRouter(
      <App />,
    );
    const detailsLink = queryByRole('link', {
      name: 'More details',
    });
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
    const detailsPage = queryByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(detailsPage).toBeInTheDocument();
  });
  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons } isFavorite />,
    );
    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon.src.includes('/star-icon.svg')).toBe(true);
  });
});
