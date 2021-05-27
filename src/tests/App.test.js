import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Págida principal é renderizada ao carregar no caminho de URL "/"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const route = '/';
  history.push(route);

  const appPage = getByText(/Encountered pokémons/i);
  expect(appPage).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  const favoritePokemons = getByText(/Favorite Pokémons/i);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});

test('É redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pageNotFound');
  expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
});
