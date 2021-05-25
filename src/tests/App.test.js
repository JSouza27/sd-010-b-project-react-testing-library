import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderRouter from './renderWithRoute';

describe('Testes prontos do arquivo', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Testa as funções da home da aplicação', () => {
  test('Testa se a página principal da Pokédex é renderizada no caminho /', () => {
    renderRouter(<App />);

    const pokedexHome = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(pokedexHome).toBeInTheDocument();
  });

  test('Testa se o topo da aplicação contém um conjunto fixo de links', () => {
    renderRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    const favLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    const navBar = screen.getByRole('navigation');

    expect(navBar).toContainElement(homeLink);
    expect(navBar).toContainElement(aboutLink);
    expect(navBar).toContainElement(favLink);
  });

  test('Testa se a aplicação é redirecionada', () => {
    renderRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    const favLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(homeLink);
    const pokedexHome = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(pokedexHome).toBeInTheDocument();

    userEvent.click(aboutLink);
    const aboutPage = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutPage).toBeInTheDocument();

    userEvent.click(favLink);
    const favPage = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(favPage).toBeInTheDocument();
  });

  test('Testa página não encontrada', () => {
    const { history } = renderRouter(<App />);

    history.push('/favoo');

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});
