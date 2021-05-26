import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Test FavoritePokemons component', () => {
  it('Should return No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noPokemon = getByText('No favorite pokemon found');
    expect(noPokemon).toBeInTheDocument();
  });

  it('Should render all favorited pokemons', () => {
    const { getAllByTestId, getAllByText } = renderWithRouter(<FavoritePokemons
      pokemons={ pokemons }
    />);
    const cards = getAllByTestId('pokemon-name');
    expect(cards.length).toBe(pokemons.length);

    const allDetailsText = getAllByText('More details');
    expect(allDetailsText.length).toBe(pokemons.length);
  });

  it('Should render 0 cards if there is no favorited pokemon', () => {
    const { queryByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const cards = queryByTestId('pokemon-name');
    expect(cards).toBeNull();
  });
});
