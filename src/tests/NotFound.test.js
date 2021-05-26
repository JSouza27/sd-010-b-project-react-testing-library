import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Testa o componente <NotFound.js />', () => {
  test('Testa se contém um h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
