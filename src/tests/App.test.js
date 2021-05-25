import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRoute from './renderWithRoute';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRoute(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testando os links', () => {
  const { getAllByRole } = renderWithRoute(<App />);
  const link = getAllByRole('link');

  expect(link[0]).toHaveTextContent('Home');

  expect(link[1]).toHaveTextContent('About');

  expect(link[2]).toHaveTextContent('Favorite Pokémons');
});

test('Testando as rotas', () => {
  const { getByText, history } = renderWithRoute(<App />);

  const route = '/';
  history.push(route);

  expect();
});
