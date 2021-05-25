import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Requirement 3', () => {
  it('Verify no favorite pokemon found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');

    const noFound = getByText('No favorite pokemon found');

    expect(noFound).toBeInTheDocument();
  });

  it('Check to add favorite pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const moreInfo = getByText(/More details/);
    expect(moreInfo).toBeInTheDocument();

    fireEvent.click(moreInfo);
    const toFavorite = getByText(/Pokémon favoritado/);
    expect(toFavorite).toBeInTheDocument();

    fireEvent.click(toFavorite);
    const linkFavoritePokemons = getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritePokemons).toBeInTheDocument();

    fireEvent.click(linkFavoritePokemons);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
