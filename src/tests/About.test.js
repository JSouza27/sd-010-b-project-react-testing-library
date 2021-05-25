import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('pagina About teste se posssui informações sobre a Pokédex', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location.pathname;
  expect(pathname).toBe('/About');
  const aboutAll = getByText(/Pokédex/);
  expect(aboutAll).toBeInTheDocument();
});
