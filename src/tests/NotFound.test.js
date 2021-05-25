import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing the NotFound.js', () => {
  test('if the page has a h2 heading with a specific text', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2Heading = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(h2Heading).toBeInTheDocument();
  });

  test('if the page has a specific image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const cryingPikachu = getByAltText(/Pikachu crying/i);

    expect(cryingPikachu).toContainHTML('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
