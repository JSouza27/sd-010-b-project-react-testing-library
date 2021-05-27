import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Testando o component NotFound', () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>,
  );

  const textNotFound = screen.getByRole('heading', {
    name: /Page Requested not found Crying emoji/i,
    level: 2,
  });
  expect(textNotFound).toBeInTheDocument();

  const imageRoute = screen.getByAltText('Pikachu crying because the page requested was not found');
  expect(imageRoute.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
