import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing FavoritePokemons.js', () => {
  it('Show no pokemon if dont have a pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemon={ [] } />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  it('Verifies if all favorite pokemon cards show up', () => {
    const { getByLabelText, getByText, history } = renderWithRouter(<App />);
    const FAVORITE = 'Pokémon favoritado?';

    history.push('/pokemons/4');
    let favorited = getByLabelText(FAVORITE);
    userEvent.click(favorited);
    expect(favorited.checked).toBeTruthy();

    history.push('/pokemons/78');
    favorited = getByLabelText(FAVORITE);
    userEvent.click(favorited);
    expect(favorited.checked).toBeTruthy();

    history.push('/favorites');
    expect(getByText('Charmander')).toBeInTheDocument();
    expect(getByText('Rapidash')).toBeInTheDocument();
  });
});
