import React from 'react';
import renderWithRouter from '../Helpers/renderWithRouter';
import { NotFound } from '../components';

test('shows a h2 element with text "Page requested not found 😭"', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const notFoundText = getByText('Page requested not found');
  const notFoundImg = getByText('😭');
  expect(notFoundText).toBeInTheDocument();
  expect(notFoundImg).toBeInTheDocument();
});

test('renders pikachu gif', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const gif = getByAltText('Pikachu crying because the page requested was not found');
  expect(gif).toHaveAttribute(
    'src',
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
