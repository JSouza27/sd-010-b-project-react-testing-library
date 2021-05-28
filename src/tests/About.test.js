import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('Verifica se a página contém informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const information = getByText(/a digital encyclopedia containing all Pokémons/i);

  expect(information).toBeInTheDocument();
});

test('Verifica se a página contém um elemento `<h2>` com o texto `About Pokédex`', () => {
  const { getByRole } = renderWithRouter(<About />);
  const headingElement = getByRole('heading', {
    level: 2,
  });

  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveTextContent('About Pokédex');
});

test('Verifica se a página  contém 2 parágrafos com texto sobre a Pokédex', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const paragraphElement = getAllByText(/Pokémons/i);

  expect(paragraphElement.length).toBe(2);
});

test('Verifica se a página contém uma imagem da Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img', {
    name: /pokédex/i,
  });
  const pokedexImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(image.src).toBe(pokedexImage);
});
