import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Checks NotFound', () => {
  it('Checks if page has "h2" with text "Page requested not found 😭"', () => {
    render(<NotFound />);

    const subtitle = screen.getByText('Page requested not found');
    expect(subtitle).toBeInTheDocument();
  });

  it('Checks if the page shows the image', () => {
    render(<NotFound />);

    const image = screen.getByAltText('Pikachu crying because'
    + ' the page requested was not found');
    expect(image.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
