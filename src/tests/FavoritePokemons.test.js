import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite', () => {
    RenderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    RenderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(checkFavorite);

    const favoritePokémons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokémons);

    const imgCardFavorite = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(imgCardFavorite).toBeInTheDocument();
  });
});
