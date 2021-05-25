import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('verificar texto da pagina não definida`', () => {
  const { getByText } = render(<NotFound />);
  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
});

test('verificar imagem da pagina não definida', () => {
  const { getAllByRole } = render(<NotFound />);
  const img = getAllByRole('img');
  expect(img.length).toBe(2);
  expect(img[1]).toBeInTheDocument();
  expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
