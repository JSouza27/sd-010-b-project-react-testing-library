import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Exibe a Pokedex quando a rota é `/`', () => {
  const { getByText } = renderWithRouter(<App />);
  const initialPage = getByText(/Pokédex/i);

  expect(initialPage).toBeInTheDocument();
});

test('Topo da aplicação contém link com o texto `Home`', () => {
  const { getByText } = renderWithRouter(<App />);
  const homeLink = getByText(/Home/i);

  expect(homeLink).toBeInTheDocument();
});

test('Topo da aplicação contém link com o texto `About`', () => {
  const { getByText } = renderWithRouter(<App />);
  const aboutLink = getByText(/About/i);

  expect(aboutLink).toBeInTheDocument();
});

test('Topo da aplicação contém link com o texto `Favorite Pokémons`', () => {
  const { getByText } = renderWithRouter(<App />);
  const favoritePokemonsLink = getByText(/Favorite Pokémons/i);

  expect(favoritePokemonsLink).toBeInTheDocument();
});
