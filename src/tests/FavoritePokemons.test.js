import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa FavoritePokemons', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorites = queryByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });
  it('Testa se todos os cards favoritados aparecem na tela', () => {
    const pokemons = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    }];
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favoritePokemon = queryByText('Pikachu');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
