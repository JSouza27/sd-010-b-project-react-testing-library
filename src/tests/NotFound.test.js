import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('test if there is a heading level 2 with text: Page requested not found', () => {
  renderWithRouter(<NotFound />);
  const text = screen.getByRole('heading', { level: 2 });
  expect(text).toBeInTheDocument();
  expect(text).toHaveTextContent('Page requested not found 😭');
});

test('test if page shows the correct image', () => {
  renderWithRouter(<NotFound />);
  const image = screen.queryAllByRole('img');
  expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
