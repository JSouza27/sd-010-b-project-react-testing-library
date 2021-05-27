import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testar o FavoritePokemons.js', () => {
  test('Verifica se "No favorite pokemon found" é exibido', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeDefined();
  });

  test('Testando se renderiza os pokémons favoritos', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetails);

    const favorite = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    userEvent.click(favorite);

    const clickFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(clickFavorite);

    const favoriteIcon = screen.getByRole('img', {
      name: /marked as favorite/i,
    });
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');

    const { getByText } = render(<FavoritePokemons />);
    expect(getByText('Pikachu')).toBeDefined();
  });

  test('verificando se tem pokemon dentro de FavoritePokemons', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoriteLink);

    const { getByText } = render(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeDefined();
  });
});
