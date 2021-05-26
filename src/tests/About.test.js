import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import { About } from '../components';

test('Testa se contém informações sobre a Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  const p = getByText(/This application simulates/i);
  expect(p).toBeInTheDocument();
});

test('Testa se contém Heading com About Pokedex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const heading = getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(heading).toBeInTheDocument();
});

test('Testa se a página tem 2 parágrafos', () => {
  const { getByText } = renderWithRouter(<About />);
  const p = getByText(/encyclopedia containing/i);
  expect(p).toBeInTheDocument();
  const p2 = getByText(/and see more/i);
  expect(p2).toBeInTheDocument();
});
