import { render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('testing component NotFound.js', () => {
  test('if contain text \'Page requested not found\' Pokédex', () => {
    const { getByRole } = render(<NotFound />);
    const notFound = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(notFound).toBeInTheDocument();
  });
  test('if contain image', () => {
    const { getByLabelText, getByAltText } = render(<NotFound />);
    const emoji = getByLabelText('Crying emoji');
    expect(emoji).toBeInTheDocument();
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
  });
});
