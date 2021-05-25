import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('testes do componente <App.js /> ', () => {
  test('testa se a rota "/" leva para a pagina principal', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/');

    const { pathname } = history.location;

    const textContentHome = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(pathname).toBe('/');
    expect(textContentHome).toBeInTheDocument();
  });
});

describe('Teste se o topo da aplicação contém links de navegação fixo.', () => {
  test('O primeiro link deve possuir o texto Home.', () => {
    RenderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    expect(linkHome).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About.', () => {
    RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });

    expect(linkAbout).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    RenderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});

describe('Testa o redirecionamento  das páginas', () => {
  test('Testa o redirecionamento para a "/" ao clicar no link Home', () => {
    const { history } = RenderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(linkHome);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Testa o redirecionamento para a "/about" ao clicar no link About', () => {
    const { history } = RenderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa o redirecionamento para a "/favorites" link Favorite Pokémons', () => {
    const { history } = RenderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/teste-de-not-found');
    const imgDaNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgDaNotFound).toBeInTheDocument();
  });
});
