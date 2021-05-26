import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText } = render(<About />);

  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Verifica se a página contém parágrafos com texto sobre a Pokédex', () => {
  const { getAllByText } = render(<About />);
  const arr = Array.from(getAllByText);

  arr.forEach((element) => {
    element = getByText(/Pokédex/i);
    expect(element).toBeInTheDocument();
  });
});

test('Verifica se a página contém uma imagem com uma determinada Url', () => {
  const { getByAltText } = render(<About />);
  const image = getByAltText('Pokédex');
  expect(image.src).toContain(
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
  );
});
