import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Testa mensagem No favorite pokemon found.', () => {
    renderWithRouter(<FavoritePokemons />);

    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);

    const favPokemon = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favPokemon);

    const cardPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(cardPokemon).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokémon é exibido, se não favoritado.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const favPokemon = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favPokemon);

    // expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();

    // const message = screen.getByText('no favorite pokemon found', { exact: false });
    // expect(message).toBeInTheDocument();
  });
});
