import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

test('contains h2 tag with definid text', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  const notFoundText = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });

  expect(notFoundText).toBeInTheDocument();
});

test('contains image with defined src', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);

  const notFoundImg = getAllByRole('img');

  expect(notFoundImg[1]).toHaveAttribute('src',
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
