import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
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
});
