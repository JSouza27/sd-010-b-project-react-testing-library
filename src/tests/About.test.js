import React from 'react';
import renderWithRouter from '../components/RenderWithRouter';
import { About } from '../components';

test('Verifica se a página contém informações sobre a Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  const p = getByText(/This application simulates/i);
  expect(p).toBeInTheDocument();
});

test('Verifica se a página contém um heading h2 com o texto "About Pokedex"', () => {
  const { getByRole } = renderWithRouter(<About />);
  const heading = getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(heading).toBeInTheDocument();
});

test('Verifica se a página tem 2 parágrafos', () => {
  const { getByText } = renderWithRouter(<About />);
  const firstParagraph = getByText(/encyclopedia containing/i);
  const secondParagraph = getByText(/and see more/i);
  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test('Verifica se a página tem uma imagem', () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img');
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
