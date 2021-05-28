import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Requirement 3 - Test the <FavoritePokemons.js> component', () => {
  it('Tests if the message \'No favorite pokemon found\' is displayed', () => {
    // Acessar componentes
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    // Manipular componentes

    // Testar componentes
    const noFavorites = getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  it('Tests if all your favorite Pokémon cards are displayed.', () => {
    // Acessar componentes
    const { getByText, getByRole, queryByText, history } = renderWithRouter(<App />);

    // Manipular componentes
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    const pokemonDetails = getByRole('link', { name: 'More details' });
    userEvent.click(pokemonDetails);
    const favoriteCheck = getByRole('checkbox', { type: 'checkbox', id: 'favorite' });
    userEvent.click(favoriteCheck);
    history.push('/favorites');

    // Testar componentes
    // expect(pathname).toBe('/favorites');
    const notFound = queryByText(/Page requested not found/i);
    expect(notFound).not.toBeInTheDocument();
  });
});
