import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing App.js', () => {
  // Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /.
  it('tests if App.js is rendered at "/" path', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
  // Teste se o topo da aplicação contém um conjunto fixo de links de navegação.
  it('tests if App.js have Home, About and Favorite Pokemons links, respectively', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    // O primeiro link deve possuir o texto Home
    expect(links[0].textContent).toBe('Home');
    // O segundo link deve possuir o texto About
    expect(links[1].textContent).toBe('About');
    // O terceiro link deve possuir o texto Favorite Pokémons
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });
  // Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
  it('tests if clicking at "Home" link, redirects to path "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText('Home');

    userEvent.click(linkHome);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
});
