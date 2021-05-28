import React from 'react';
import { screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  //   <MemoryRouter>
  //     <App />
  //   </MemoryRouter>,
  // );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('página  é renderizada ao carregar a aplicação no caminho de URL /.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const route = '/';
  history.push(route);

  const appPage = getByText(/Encountered pokémons/i);
  expect(appPage).toBeInTheDocument();
});

test('topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  const favoritepokemons = getByText(/Favorite Pokémons/i);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritepokemons).toBeInTheDocument();
});

test('É redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pageNotFound');
  expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
});
