import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  // renderiza uma reading() com o texto `Pokédex`
  test('renders a reading with the text `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />); // não entendi o pq o history não passou aqui como na aula ao vivo 15.3
    const heading = getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });
    // const heading = getByText(/Pokédex/i)
    expect(heading).toBeInTheDocument();
  });

  // verifica o conjunto fixo de links de navegação.
  test('shows the Pokédex when the route is `/Home`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();
  });
  test('shows the Pokédex when the route is `/About`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkAbout = getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();
  });
  test('shows the Pokédex when the route is `/Favorite`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkFavorite = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
  });

  test('Redireciona para a página inicial, na URL / ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Redireciona para a página /about ao clicar no link Aboutt.', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const pageAbout = getAllByRole('link');
    fireEvent.click(pageAbout[1]);
    expect(history.location.pathname).toBe('/about');
  });

  test('Redireciona para a página  /favorites ao clicar no link Favorites.', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const pageFavorite = getAllByRole('link');
    fireEvent.click(pageFavorite[2]);
    expect(history.location.pathname).toBe('/favorites');
  });
});

describe('Rota não encontrada', () => {
  test('Redireciona para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    const route = '/notfound';
    history.push(route);
    const pageNotFound = screen.getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
