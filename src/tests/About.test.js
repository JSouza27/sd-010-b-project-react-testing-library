import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { fireEvent, getByRole, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('A página contém as informações sobre a Pokédex', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/about');
  const info1 = ('This application simulates a Pokédex,'
  + ' a digital encyclopedia containing all Pokémons');
  const info2 = ('One can filter Pokémons by type,'
  + ' and see more details for each one of them');

  const infoElement1 = getByText(info1);
  const infoElement2 = getByText(info2);

  expect(infoElement1).toBeInTheDocument();
  expect(infoElement2).toBeInTheDocument();
});

test('a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  history.push('/about');
  const info1 = 'About Pokédex';

  const h2Element = getByRole('heading', { level: 2 });

  expect(h2Element).toBeInTheDocument();
  expect(h2Element).toHaveTextContent(info1);
});

test('A página contém um imagem da pokedex', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  history.push('/about');
  const imageLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  const imgElement = getByRole('img');

  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute('src', imageLink);
});
