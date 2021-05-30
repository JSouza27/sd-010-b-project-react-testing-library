import React from 'react';
import { NotFound } from '../components';
import renderWithRoute from '../helper/renderWithRoute';

describe('Request 4', () => {
  it('contains a heading lvl 2 with the following text', () => {
    const { getByRole } = renderWithRoute(<NotFound />);
    const title = getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  it('shows the following image', () => {
    const { getByAltText } = renderWithRoute(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
