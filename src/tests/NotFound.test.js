import React from 'react';
import { NotFound } from '../components';
import renderWithRoute from './renderWithRoute';

test('Testando Pagina Not Found', () => {
  const { getByText, getAllByRole } = renderWithRoute(<NotFound />);

  const text = getByText(/Page requested not found/i);
  const image = getAllByRole('img');

  expect(text).toBeInTheDocument();
  expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
