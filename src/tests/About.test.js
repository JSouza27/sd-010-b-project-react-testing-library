import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './RenderWithRouter';

test('Testa se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const textAbout = screen.getByText('This application simulates a Pokédex,'
  + ' a digital encyclopedia containing all Pokémons');

  expect(textAbout).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);
  const h2Text = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(h2Text).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const paragraphAbout1 = screen.getByText(/This application simulates a Pokédex/i);

  const paragraphAbout2 = screen.getByText(/One can filter Pokémons by type/i);

  expect(paragraphAbout1).toBeInTheDocument();
  expect(paragraphAbout2).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  renderWithRouter(<About />);
  const urlImg = screen.getByRole('img');
  expect(urlImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
