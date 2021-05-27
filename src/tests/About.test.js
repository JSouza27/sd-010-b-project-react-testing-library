import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const about = getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(about).toBeInTheDocument();
});

test('Teste se a página contémdois parágrafos com texto sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const p1 = ('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
  const p2 = ('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
  const phrase1 = getByText(p1);
  const phrase2 = getByText(p2);
  expect(phrase1).toBeInTheDocument();
  expect(phrase2).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const img = getByAltText('Pokédex');
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
