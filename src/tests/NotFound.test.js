import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

test('check is there is a heading h2', () => {
  renderWithRouter(<NotFound />);

  const message = screen.getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });
  expect(message).toBeInTheDocument();
});

test('check if the pages renders picture', () => {
  renderWithRouter(<NotFound />);

  const image = screen.getByAltText(/Pikachu crying because the page requested was not found/i);

  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
