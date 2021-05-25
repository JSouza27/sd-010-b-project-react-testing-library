import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

import renderRouter from './renderWithRoute';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testa se a página principal da Pokédex é renderizada no caminho /', () => {
  renderRouter(<App />);

  const pokedexHome = screen.getByRole('heading', {
    level: 2,
  });
  expect(pokedexHome).toBeInTheDocument();
});

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderRouter(<App />);

  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  const favLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });

  const navBar = screen.getByRole('navigation');

  expect(navBar).toContainElement(homeLink);
  expect(navBar).toContainElement(aboutLink);
  expect(navBar).toContainElement(favLink);
});

test('Testa se a aplicação é redirecionada', () => {
  renderRouter(<App />);
});
