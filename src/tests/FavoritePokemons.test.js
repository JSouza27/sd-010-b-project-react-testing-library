import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<App />)
    const linkFavPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavPokemons);
    const pokemonNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(pokemonNotFound).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />)
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const checkBoxFavarite = screen.getByRole('checkbox', {  name: /pokémon favoritado\?/i});
    userEvent.click(checkBoxFavarite);
    const linkFavPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavPokemons);
    const getImg = screen.getByRole('img', {  name: /pikachu sprite/i});
    expect(getImg).toBeInTheDocument();
  });
});
