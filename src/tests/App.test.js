import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test o Componente', () => {
  test('Teste se a página principal é renderizada na URL /`', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const iAmAtHome = screen.getByRole('heading', {
      name: /encountered pokémons/i });
    expect(iAmAtHome).toBeInTheDocument();
  });

  test('Testa se o primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByRole('link', { name: /home/i });
    expect(textHome).toBeInTheDocument();
  });

  test('Testa se o segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);

    const textAbout = screen.getByRole('link', { name: /about/i });
    expect(textAbout).toBeInTheDocument();
  });

  test('Testa se o terceiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);

    const textFavPokemon = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(textFavPokemon).toBeInTheDocument();
  });
});
