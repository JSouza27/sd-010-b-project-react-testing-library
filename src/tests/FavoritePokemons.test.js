import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente About.js .', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<App />);

    const FavoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(FavoriteLink);

    const favoriteMensage = screen.getByText('No favorite pokemon found');
    expect(favoriteMensage).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);

    const isFavorite = screen.getByRole('checkbox');
    userEvent.click(isFavorite);

    const FavoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(FavoriteLink);

    const favoritePokemon = screen.getAllByRole('img');
    expect(favoritePokemon[1]).toHaveAttribute('src', '/star-icon.svg');
  });
});
