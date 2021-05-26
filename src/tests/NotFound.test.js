import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('requisiot 4', () => {
  test('page have text "Page requested not found" in the h2 tag', () => {
    const altText = 'Pikachu crying because the page requested was not found';
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/,
    });
    expect(h2).toBeInTheDocument();

    const img = screen.getByAltText(altText);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
