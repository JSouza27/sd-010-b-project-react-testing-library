import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste component Favorite Pokemons', () => {
  test('No favorite pokemon found', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoritePokemons);

    const favorite = screen.getByText('No favorite pokemon found');

    expect(favorite).toBeInTheDocument();
  });
  test('Exibido todos cards pakémons favoritados', () => {

  });
  test('Nenhum card pokémon é exibido', () => {

  });
});
