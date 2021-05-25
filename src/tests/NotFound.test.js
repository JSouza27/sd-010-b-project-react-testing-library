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

test('Testa se a página mostra uma imagem', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const img = getAllByRole('img');
  expect(img[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
