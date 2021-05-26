import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se a página principal da Pokédex é renderizada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
  });
  it('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    const linkFavPokemons = getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavPokemons).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página inicial, na URL /', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Teste se é redirecionada para a página de About, URL /about', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkAbout = getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se é redirecionada para a página de Favoritados, na URL /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkFavPokemons = getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const notFound = getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
