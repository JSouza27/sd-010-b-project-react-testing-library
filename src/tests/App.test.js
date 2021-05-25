import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = screen.getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Verifica se pagina inicial contem links de navegação', () => {
  renderWithRouter(<App />);
  const textHome = screen.getByText('Home');
  const textAbout = screen.getByText('About');
  const textFavorite = screen.getByText('Favorite Pokémons');

  expect(textHome).toBeInTheDocument();
  expect(textAbout).toBeInTheDocument();
  expect(textFavorite).toBeInTheDocument();
});

test('Testa redirecionamento da pagina para o Home', () => {
  const { history } = renderWithRouter(<App />);

  const linkHome = screen.getByRole('link', {
    name: /home/i,
  });

  userEvent.click(linkHome);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testa redirecionamento da pagina para o About', () => {
  const { history } = renderWithRouter(<App />);

  const linkAbout = screen.getByRole('link', {
    name: /About/i,
  });

  userEvent.click(linkAbout);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Testa redirecionamento da pagina para o Favorites', () => {
  const { history } = renderWithRouter(<App />);

  const linkFavorite = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });

  userEvent.click(linkFavorite);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Testa redirecionamento da pagina uma pagina não conhecida', () => {
  const { history } = renderWithRouter(<App />);

  const route = '/essa-pagina-nao-existe';
  history.push(route);

  const notFound = screen.getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
