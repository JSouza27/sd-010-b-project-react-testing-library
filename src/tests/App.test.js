import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Exibe a Pokedex quando a rota é `/`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const initialPage = getByText(/Pokédex/i);
  expect(initialPage).toBeInTheDocument();
});

test('Topo da aplicação contém link com o texto `Home`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();
});

test('Topo da aplicação contém link com o texto `About`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = getByText(/About/i);
  expect(aboutLink).toBeInTheDocument();
});

test('Topo da aplicação contém link com o texto `Favorite Pokémons`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoritePokemonsLink = getByText(/Favorite Pokémons/i);
  expect(favoritePokemonsLink).toBeInTheDocument();
});
