import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../helper/renderWithRouter';

test('if the page contains a heading lvl 2 with the following text', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const title = getByRole('heading', { level: 2, name: /page requested not found/i });
  expect(title).toBeInTheDocument();
});

test('if the page shows the following image', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
