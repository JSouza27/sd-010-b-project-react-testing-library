import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('teste no componente FavoritePokemon.js', () => {
  test('testando se a tela aparece a mensagem: No favorite pokemon found ', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const favorite = getByText('Favorite pokémons')
    fireEvent.click(favorite);
    const noFavorite = getByText('No favorite pokemon found')
    expect(noFavorite).toBeInTheDocument();
  });
  test('testando se todos os card favoritos são exibidos', () => {
    const { getByText } = renderWithRouter(<App />)
    const details = getByText('More details')
    const favoriteChoosen = getByText('Pokémon favoritado?')
    const favorite = getByText('Favorite Pokémons')
    const pikachu = getByText('Pikachu')
    fireEvent.click(details);
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(favorite);
    expect(pikachu).toBeInTheDocument();

  })
  test('testando se nenhum card de pokémon é exibido', () => {
    const {  } = renderWithRouter(<FavoritePokemons />)
    
  })
  
});
