import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste do quarto requisito', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const heading = getByRole('heading', { level: 2 });

  expect(heading).toHaveTextContent('Page requested not found');
});
