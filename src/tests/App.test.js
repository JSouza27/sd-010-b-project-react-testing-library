import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Teste o componente <App />', () => {
  it('Teste se a página principal da Pokédex renderiza no caminho de URL /', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/');

    const title = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Teste se ao clicar em home, a pagina é direcionada ao caminho url"/"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const url = history.location.pathname;

    expect(url).toBe('/');
  });

  it('Teste se ao clicar em about, a pagina é direcionada ao caminho url"/about"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const url = history.location.pathname;

    expect(url).toBe('/about');
  });

  it('Teste se ao clicar em about pagina é direcionada ao caminho url /favorites', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorites);
    const url = history.location.pathname;

    expect(url).toBe('/favorites');
  });

  it('Teste se a aplicação abre a página Not Found com url a invalida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-invalida');

    const notFoundMessage = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFoundMessage).toBeInTheDocument();
  });
});
