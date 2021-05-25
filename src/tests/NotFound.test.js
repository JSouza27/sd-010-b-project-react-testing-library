import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testint the 4th requirement: NotFound component', () => {
  it('render h2 with text "Page request not found"', () => {
    const { getByRole } = render(<NotFound />);
    const message = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });
    expect(message).toBeInTheDocument();
  });
  it('render image with a crying pikachu', () => {
    const { getByRole } = render(<NotFound />);
    const image = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
