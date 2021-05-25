import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(`Requesito 1 - Será avaliado se o arquivo teste App.test.js contemplam 100% 
dos casos de uso criados pelo Stryker`, () => {
  it(`Teste se a página principal da Pokédex é renderizada ao carregar a 
  aplicação no caminho de URL / `, () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/');
    const heading = getByText(/^Pokédex$/i);
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Pokédex');
  });

  it(`Teste se o topo da aplicação contém um conjunto fixo de links 
  de navegação`, () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText(/^home$/i);
    const linkAbout = getByText(/^about$/i);
    const linkFavoritePokemons = getByText(/favorite pokémon/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkHome.textContent).toBe('Home');

    expect(linkAbout).toBeInTheDocument();
    expect(linkAbout.textContent).toBe('About');

    expect(linkFavoritePokemons).toBeInTheDocument();
    expect(linkFavoritePokemons.textContent).toBe('Favorite Pokémons');
  });

  it(`Teste se a aplicação é redirecionada para a página inicial, na 
  URL / ao clicar no link Home da barra de navegação`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/^home$/i);
    fireEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About, na 
  URL /about, ao clicar no link About da barra de navegação`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/^about$/i);
    fireEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, 
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/^favorite pokémons$/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página Not Found ao entrar 
  em uma URL desconhecida`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/notFound');
    const notFoundTitle = getByText(/page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
