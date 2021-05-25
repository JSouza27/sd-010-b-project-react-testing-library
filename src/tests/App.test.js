import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the tex `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Verifica se o texto "home" é renderizado`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const text = getByText(/home/i);
  expect(text).toBeInTheDocument();
});

test('Verifica se o texto "about" é renderizado`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const text = getByText(/about/i);
  expect(text).toBeInTheDocument();
});

test('Verifica se o texto "Favorite Pokémons" é renderizado`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const text = getByText(/Favorite Pokémons/i);
  expect(text).toBeInTheDocument();
});
