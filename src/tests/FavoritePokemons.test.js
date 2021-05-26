import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import Favorite from '../components/FavoritePokemons';
import App from '../App';

describe('Test `Favorite pokémon` component', () => {
  it('Test not found pokemon', () => {
    const { getByText, history } = renderWithRouter(<Favorite />);
    history.push('favorites');
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Test pokemon card in favorites', () => {
    const { getByRole, getByTestId, history } = renderWithRouter(<App />);
    const moreBtn = getByRole('link', { name: /More details/i });
    fireEvent.click(moreBtn);
    fireEvent.click(getByRole('checkbox'));
    const name = getByTestId('pokemon-name');
    const favBtn = getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(favBtn);
    const { location: { pathname } } = history;
    // history.push('/favorites');
    console.log(name);
    expect(pathname).toBe('/favorites');
    // mock da "api" teste
  });
});
