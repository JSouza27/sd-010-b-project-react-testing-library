import React from 'react';
import renderWithRouter from '../RenderWithRouter';

import { NotFound } from '../components';

test('Testa se contem h2 com Page requested not found', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const heading = getByRole('heading', {
    level: 2,
    name: /Page requested not found Crying emoji/i,
  });
  expect(heading).toBeInTheDocument();
});

