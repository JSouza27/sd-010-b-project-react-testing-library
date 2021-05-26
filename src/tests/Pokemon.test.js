import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de um pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const pokemonImage = screen.getByRole('img', {
      name: /Pikachu sprite/i,
    });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const firstPokemon = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(firstPokemon).toBeInTheDocument();
  });

  test('', () => {
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

    const favoritePokemon = screen.getAllByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoritePokemon[0]).toHaveAttribute('src', '/star-icon.svg');
  });
});
