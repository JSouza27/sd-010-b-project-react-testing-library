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
    const { getByText, getByTestId } = renderWithRouter(<App />);

    userEvent.click(getByText('Home'));
    userEvent.click(getByText('More details'));
    userEvent.click(getByText('Pokémon favoritado?'));
    userEvent.click(getByText('Favorite Pokémons'));

    const pokemon = getByTestId('pokemon-name');

    expect(pokemon).toBeInTheDocument();
  });

  it('renders a msg when no Pokémon is selected as a favorite', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
