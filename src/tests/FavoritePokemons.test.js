import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Tests of component FavoritePokémons.', () => {
  test('shows the message for no favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText('No favorite pokemon found');

    expect(message).toBeInTheDocument();
  });

  it('verify if shows all the favorite Pokémons', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    userEvent.click(getByRole('link', { name: 'More details' }));
    userEvent.click(getByRole('checkbox', { name: 'Pokémon favoritado?' }));
    userEvent.click(getByRole('link', { name: 'Favorite Pokémons' }));

    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByRole('img', {
      name: /pikachu is marked as favorite/i,
    })).toBeInTheDocument();
  });

  it('verify if shows no favorite Pokémons', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    userEvent.click(getByRole('link', { name: 'Favorite Pokémons' }));
    userEvent.click(getByRole('link', { name: /More details/i }));
    userEvent.click(getByRole('checkbox', { name: /Pokémon favoritado/i }));
    userEvent.click(getByRole('link', { name: /Favorite Pokémons/ }));

    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
