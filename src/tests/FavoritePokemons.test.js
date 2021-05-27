import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);

    const message = 'No favorite pokemon found';
    const paragraphMsg = screen.getByText(message);

    expect(paragraphMsg).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(getLink);

    const inputCheckBox = screen.getByRole('checkbox', { checked: false });

    userEvent.click(inputCheckBox);
    expect(inputCheckBox).toBeChecked();

    const linkToFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(linkToFavorite);

    const getFavoriteElement = screen.getAllByText(/pikachu/i);
    expect(getFavoriteElement[0]).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    render(<FavoritePokemons />);

    const getfavorite = screen.getByText(/Favorite pokémons/i);
    const getNoFavorite = screen.getByText(/No favorite pokemon found/i);

    expect(getfavorite).toBeInTheDocument();
    expect(getNoFavorite).toBeInTheDocument();
  });
});
