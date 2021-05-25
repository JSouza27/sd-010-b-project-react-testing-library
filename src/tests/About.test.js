import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Test if page contains information about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const about = getByText(/this application simulates a Pokédex/i);
  expect(about).toBeInTheDocument();
  const about2 = getByText(/and see more details for each one of them/i);
  expect(about2).toBeInTheDocument();
});

test('Test if About has h2 with About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const title = getByRole('heading', { name: 'About Pokédex', level: 2 });
  expect(title).toBeInTheDocument();
  const image = getByRole('img');
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(image).toHaveAttribute('alt', 'Pokédex');
});
