import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testing NotFound.js', () => {
  it('Verifies if have a h2 with "Page requested not found 😭" text', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
  it('Verifies if the showed img is an specific gif', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img');
    expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
