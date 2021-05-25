import React from 'react';
import renderWithRoute from './renderWithRoute';
import About from '../components/About';

test('Testando a rota About', () => {
  const { getAllByText } = renderWithRoute(<About />);

  const paragraph = getAllByText(/Pokémons/i);

  expect(paragraph).toHaveLength(2);
});

test('Testando o heading', () => {
  const { getByRole } = renderWithRoute(<About />);

  const heading = getByRole('heading', {
    level: 2,
  });

  expect(heading).toHaveTextContent('About');
  expect(heading).toHaveTextContent('Pokédex');
});

test('Testando a Imagem', () => {
  const { getByRole } = renderWithRoute(<About />);

  const image = getByRole('img');

  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
