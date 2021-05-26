import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Renders favorites Pokémons when needed', () => {
  it('renders a message with text "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });

  it('renders a favorited pokemon when needed"', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeLink = getByText('Home');
    const favoriteLink = getByText('Favorite Pokémons');
    const moreDetailsLink = getByText('More details');

    userEvent.click(homeLink);
    userEvent.click(moreDetailsLink);

    const favoriteBtn = getByText('Pokémon favoritado?');

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteLink);

    const pikachu = getByText('Pikachu');

    expect(pikachu).toBeInTheDocument();
  });

  it('renders a msg when no Pokémon is selected as a favorite', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
