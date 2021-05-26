import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Testes do requisito 6', () => {
  it('Teste se renderiza um card com as informações de um pokémon', () => {
    const { getByTestId, getByAltText, getByRole, history } = renderWithRouter(<App />);

    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const average = getByTestId('pokemon-weight');
    const image = getByAltText('Pikachu sprite');
    const link = getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(link);

    const { pathname } = history.location;

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(average).toHaveTextContent('Average weight: 6.0 kg');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ pokemons[0].id }
      />,
    );

    const imgFavorite = getByAltText('Pikachu is marked as favorite');

    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
