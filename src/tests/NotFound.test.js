import { render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('testing component NotFound.js', () => {
  test('if contain text \'Page requested not found\' Pokédex', () => {
    const { getByRole, getByLabelText } = render(<NotFound />);
    const notFound = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(notFound).toBeInTheDocument();
    const emoji = getByLabelText('Crying emoji');
    expect(emoji).toBeInTheDocument();
  });
  test('if contain image', () => {
    const { getByRole } = render(<NotFound />);
    const img = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
