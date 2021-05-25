import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('verificar texto da pagina não definida`', () => {
  const { getByText } = render(<NotFound />);
  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
});

test('verificar imagem da pagina não definida', () => {
  const { getAllByRole, getByTestId } = render(<NotFound />);
  const img = getAllByRole('img');
  expect(img.length).toBe(2);
  const imgNotFound = getByTestId('image-not-found');
  expect(imgNotFound).toBeInTheDocument();
  expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
