import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testing the FavoritePokemons.js', () => {
  test('if show the message No favorite pokemon found if no favorited pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const favoriteLink = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    fireEvent.click(favoriteLink);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('if shows the favorited pokemon cards', () => {
    const { getByRole, getByAltText, getByText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(detailsLink);
    const check = getByRole('checkbox');
    fireEvent.click(check);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const card = getByAltText(/pikachu is marked as favorite/i);
    expect(card).toBeInTheDocument();
  });
});
