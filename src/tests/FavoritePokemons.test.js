import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App'

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
            foundAt: [
              {
                location: 'Kanto Viridian Forest',
                map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
              },
              {
                location: 'Kanto Power Plant',
                map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
              },
            ],
            summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
          }];
        const {queryByText} = renderWithRouter(<FavoritePokemons pokemons={pokemons} />);
        const favoritePokemon = queryByText('Pikachu');
        expect(favoritePokemon).toBeInTheDocument();
    })
});