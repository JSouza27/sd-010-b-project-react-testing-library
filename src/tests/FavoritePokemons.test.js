import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('Test the component FavoritePokemons', () => {
  test('renders text "No favorite pokemon found", if person not have pokemons', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    const linkFavoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    fireEvent.click(linkFavoritePokemons);
    const FavoritePage = history.location.pathname;
    expect(FavoritePage).toBe('/favorites');

    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('renders all the cards of favorite pokemons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(linkDetails);

    const checkFavorite = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    fireEvent.click(checkFavorite);

    const favorite = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    fireEvent.click(favorite);

    const imgFavoritePokemon = getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(imgFavoritePokemon).toBeInTheDocument();
  });
});
