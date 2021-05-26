import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('teste no componente FavoritePokemon.js', () => {
  test('testando se a tela aparece a mensagem: No favorite pokemon found ', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const favorite = getByText('Favorite pokémons');
    fireEvent.click(favorite);
    const noFavorite = getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
  test('testando se todos os card favoritos são exibidos', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);
    const favoriteChoosen = getByText('Pokémon favoritado?');
    fireEvent.click(favoriteChoosen);
    const favorite = getByText('Favorite Pokémons');
    fireEvent.click(favorite);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
  test('testando se nenhum card de pokémon é exibido', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const favoriteLink = getByText('Favorite pokémons');
    fireEvent.click(favoriteLink);
    const notFoundFavorite = getByText('No favorite pokemon found');
    expect(notFoundFavorite).toBeInTheDocument();
  });
});
