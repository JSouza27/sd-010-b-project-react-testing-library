import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testa requisito 3', () => {
  it('verifica text not found', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('verifica se há pokemons favoritados', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);

    const checkboxFavourite = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    userEvent.click(checkboxFavourite);

    const favPkmn = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favPkmn);

    const pkmnImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pkmnImg).toBeInTheDocument();
  });
});
