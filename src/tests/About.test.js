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
