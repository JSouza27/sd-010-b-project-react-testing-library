import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';

describe('Teste App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Pokédex é renderizada ao carregar a aplicação no caminho de URL "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/';
    history.push(route);

    const aplicacao = getByText(/Encountered pokémons/i);
    expect(aplicacao).toBeInTheDocument();
  });
  test('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favoritePokemons = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  test('A é aplicação é redireciona para ahome, na URL / ao clicar no link Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    userEvent.click(home);
    const aplicacao = getByText(/Encountered pokémons/i);
    expect(aplicacao).toBeInTheDocument();
  });
  test('Ao clicar em About, de redirecionar para"/about"', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    userEvent.click(about);
    const aboutPage = getByText(/About Pokédex/i);
    expect(aboutPage).toBeInTheDocument();
  });
  test('Ao clicar em Pokémons Favoritados, ir para o "/favorites"', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/i);
    userEvent.click(favorite);
    const favoritePage = getByRole('heading', {
      level: 2,
      name: /Favorite Pokémons/i,
    });
    expect(favoritePage).toBeInTheDocument();
  });
  test('Verifica se carrega a página não encontrada', () => {
    const { history, getByText, getByRole } = renderWithRouter(<App />);

    const route = '/pagina-que-nao-existe';
    history.push(route);

    const pageNotFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
