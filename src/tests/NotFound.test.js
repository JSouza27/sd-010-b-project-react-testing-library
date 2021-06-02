import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <NotFound.js />', () => {
  it('Testanto página NotFound', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(notFound).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
