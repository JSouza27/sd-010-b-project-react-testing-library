import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 6', () => {
  test('A card with the information of a certain Pokémon is rendered', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);
    const pokeName = getByText(/Pikachu/i);
    expect(pokeName).toBeInTheDocument();

    const pokeType = getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(/Electric/i);

    const pokeWeight = getByText(/6.0 kg/i);
    expect(pokeWeight).toBeInTheDocument();

    const pokeImg = getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Pokémon card indicated contains a nav link to details of that Pokémon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const pokeDetails = getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeDetails);
    expect(history.location.pathname).toBe('pokemons/25');

    const pokeTitle = getByText(/Summary/i);
    expect(pokeTitle).toBeInTheDocument();
  });
});
