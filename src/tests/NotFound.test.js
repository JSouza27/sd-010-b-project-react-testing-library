import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('testing the` <NotFound.js />` component', () => {
  test('check if page contains an `h2` heading with the text `Page requested not found`',
    () => {
      renderWithRouter(<NotFound />);

      expect(screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      })).toBeInTheDocument();
    });

  test('check if page shows the image `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`',
    () => {
      renderWithRouter(<NotFound />);

      const imageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

      const imageAlt = 'Pikachu crying because the page requested was not found';

      expect(screen.getByAltText(imageAlt)).toHaveAttribute('src', imageSrc);
    });
});
