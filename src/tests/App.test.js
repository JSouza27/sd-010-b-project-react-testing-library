import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes no App.js', () => {
  test('Renderiza uma heading com o texto `Pokédex`', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('A aplicação renderiza na página Home ao abrir', () => {
    const history = createMemoryHistory();
    const pageName = history.location.pathname;
    expect(pageName).toBe('/');
  });

  test('No topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);

    const projectsLink1 = screen.getByRole('link', {
      name: /Home/i,
    });
    const projectsLink2 = screen.getByRole('link', {
      name: /About/i,
    });
    const projectsLink3 = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(projectsLink1).toBeInTheDocument();
    expect(projectsLink2).toBeInTheDocument();
    expect(projectsLink3).toBeInTheDocument();
  });

  test('Aplicacao redirecionada para a home', () => {
    const { history } = renderWithRouter(<App />);
    const projectsLink1 = screen.getByRole('link', {
      name: /Home/i,
    });

    fireEvent.click(projectsLink1);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Aplicação redirecionada para a about', () => {
    const { history } = renderWithRouter(<App />);
    const projectsLink2 = screen.getByRole('link', {
      name: /About/i,
    });

    fireEvent.click(projectsLink2);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutText = screen.getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('Aplicação redirecionada para a favorites pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const projectsLink3 = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    fireEvent.click(projectsLink3);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteText = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(favoriteText).toBeInTheDocument();
  });

  test('Página quebra ao utilizar URL incorreta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nao-existe');

    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
