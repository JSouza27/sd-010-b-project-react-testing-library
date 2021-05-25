import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper';

test('Render About page', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('about');
  const about = getByText(/This application simulates a Pokédex/i);
  expect(about).toBeInTheDocument();

  const h1 = screen.getByRole('heading', {
    level: 1,
  });

  expect(h1).toBeInTheDocument();

  const h2 = screen.getByText(/About Pokédex/i);

  expect(h2).toBeInTheDocument();

  const p1 = screen.getByText(/This application simulates a Pokédex/i);
  const p2 = screen.getByText(/One can filter Pokémons by type/i);
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();

  const img = screen.getByRole('img');
  const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(img.src).toEqual(link);
});
