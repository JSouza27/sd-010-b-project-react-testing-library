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

    userEvent.click(screen.getByRole('link', { name: /home/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const inHome = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(inHome).toBeInTheDocument();
  });

  test('Testa redirecionamento para URL /about ao clicar na About.', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /about/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const inAbout = screen.getByRole('img', { name: /pokédex/i });
    expect(inAbout).toBeInTheDocument();
  });

  test('Testa redirecionamento para URL /favorites ao clicar Fav. Pokemon', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const inFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(inFavorites).toBeInTheDocument();
  });

  it('Testa um caminho não existente e a renderização do Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/nao-existe');
    const noMatch = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
    expect(noMatch).toBeInTheDocument();
  });
});
