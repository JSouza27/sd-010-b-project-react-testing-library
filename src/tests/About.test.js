import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import { About } from '../components';

test('Testa se tem informação sobre a Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  const p = getByText(/This application simulates/i);
  expect(p).toBeInTheDocument();
});
test('Testa se tem informação sobre Heading com about Pokedex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const heading = getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(heading).toBeInTheDocument();
});

test('Testa se possui 2 paragrafos', () => {
  const { getByText } = renderWithRouter(<About />);
  const p = getByText(/encyclopedia containing/i);
  expect(p).toBeInTheDocument();
  const p2 = getByText(/and see more/i);
  expect(p2).toBeInTheDocument();
});
test('verifica se a pagina tem imagem', () => {
  const { getByRole } = renderWithRouter(<About />);
  const img = getByRole('img');
  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
