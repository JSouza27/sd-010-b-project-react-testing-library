import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testando componente App.js', () => {
  it('Testa se a home é renderizada no caminho de url /', () => {
    const { queryByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const button = queryByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(button).toBeInTheDocument();
  });

  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { queryByRole } = renderWithRouter(<App />);
    const homeLink = queryByRole('link', {
      name: 'Home',
    });
    const aboutLink = queryByRole('link', {
      name: 'About',
    });
    const favoritesLink = queryByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  it(`Testa se a aplicação é redirecionada para a página inicial
  ao clicar no link Home`, () => {
    const { queryByRole, history } = renderWithRouter(<App />);
    const homeLink = queryByRole('link', {
      name: 'Home',
    });
    fireEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it(`Testa se a aplicação é redirecionada para a página de About
  ao clicar no link About`, () => {
    const { queryByRole, history } = renderWithRouter(<App />);
    const aboutLink = queryByRole('link', {
      name: 'About',
    });
    fireEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it(`Testa se a aplicação é redirecionada para a página de Pokémons Favoritados
  ao clicar no link Favorite Pokémons`, () => {
    const { queryByRole, history } = renderWithRouter(<App />);
    const favoritesLink = queryByRole('link', {
      name: 'Favorite Pokémons',
    });
    fireEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it(`Testa se a aplicação é redirecionada para a página Not Found
  ao entrar em uma URL desconhecida.`, () => {
    const { history, queryByAltText } = renderWithRouter(<App />);
    history.push('/url-não-existente');
    const notFound = queryByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFound).toBeInTheDocument();
  });
});
