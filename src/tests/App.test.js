import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste requisito 1', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />); // essa é uma forma sem o Screen. Mas como usei getByText aqui embaixo, tenho que fazer essa desestruturação aqui.

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument(); // aqui testa se tá escrito pokedex.
  });
  test('Testa se a página principal é renderizada ao carregar a aplicação', () => {
    renderWithRouter(<App />);
    expect(screen.queryByText('Encountered pokémons')).toBeDefined();
  }); // aqui usei o screen, então não tive que fazer a desestruturação desse queryByText como fiz agora pouco com o getByText.
  test('Testa se no primeiro link está escrito Home.', () => {
    renderWithRouter(<App />); // Isso aqui tá feito no renderWIthRouter.js(tenho que OLHAR SEMPRE LÁ pra entender o que foi feito)  Isso também me permite fazer menos imports. E aí só preciso colocar renderWithRouter(<App />); nos testes.
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(homeLink).toBeInTheDocument();
  });
  test('Testa se no segundo link está escrito About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    expect(aboutLink).toBeInTheDocument();
  });
  test('Testa se no terceiro link está escrito Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });
  test('Testa se redireciona para a página inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink); // aqui eu clico no LINK home.
    expect(pathname).toBe('/');
  });
  test('Testa se redireciona para a página About ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(aboutLink);
    const { pathname } = history.location; // IMPORTANTE: Aqui que uso isso do history.location, DEPOIS do click. O histórico tem que ser depois do click, senão fica o histórico desde o HOME de novo, e aí daria erro.
    expect(pathname).toBe('/about');
  });
  test('Testa se vai para Pokémons Favoritados ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoritePokemonsLink);
    const { pathname } = history.location; // aqui também é DEPOIS do click.
    expect(pathname).toBe('/favorites');
  });
  test('Testa se vai para a página Not Found ao entrar em uma URL desconhecida.', () => {
    renderWithRouter(<App />);
    expect(screen.queryByText('Page requested not found 😭')).toBeDefined();
  });
});
