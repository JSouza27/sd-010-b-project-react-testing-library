import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Renders not found page when a invalid url is required', () => {
  it('render a heading with text "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const message = getByRole('heading', { level: 2 });

    expect(message).toHaveTextContent(/Page requested not found/i);
  });

  it('render a not found image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText(/Pikachu crying/i);

    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
