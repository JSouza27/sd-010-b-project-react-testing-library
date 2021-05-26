import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it('testa o comportamento no caso de não ter pokemons favoritos', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonsFavoritos = getByText(/Favorite Pokémons/i);

    fireEvent.click(pokemonsFavoritos);
    const noPokemonsFound = getByText(/No favorite pokemon found/i);

    expect(noPokemonsFound).toBeInTheDocument();
  });
});
