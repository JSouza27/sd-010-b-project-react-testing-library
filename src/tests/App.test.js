import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';

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
test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  const favoritePokemons = getByText(/Favorite Pokémons/i);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});
