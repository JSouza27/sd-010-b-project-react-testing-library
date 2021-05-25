import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { About } from '../components';

test('pagina About teste se posssui informações sobre a Pokédex', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { location: { pathname } } = history;
  expect(pathname).toBe('/about');
  const aboutAll = getByText(/About Pokédex/);
  expect(aboutAll).toBeInTheDocument();
});

test('pagina About pussui imagem da Pokédex', () => {
  const { getByRole } = render(<About />);
  const img = getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(img).toHaveAttribute('alt', 'Pokédex');
});
