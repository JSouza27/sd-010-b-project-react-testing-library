import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o Componente', () => {
  test('Teste se a página principal é renderizada na URL /`', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const iAmAtHome = screen.getByRole('heading', {
      name: /encountered pokémons/i });
    expect(iAmAtHome).toBeInTheDocument();
  });
});

describe('Teste se o topo da aplicação contém links de navegação', () => {
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

describe('Teste de redirecionamento de páginas', () => {
  test('Testa redirecionamento para URL / ao clicar na Home.', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('heading', {
      name: /encountered pokémons/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const inHome = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(inHome).toBeInTheDocument();
  });
});
