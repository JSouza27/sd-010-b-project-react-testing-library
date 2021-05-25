import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  const { getByAltText, getByLabelText } = render(<NotFound />);
  expect(screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  })).toBeInTheDocument();
  const emoji = getByLabelText('Crying emoji');
  expect(emoji).toBeInTheDocument();

  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
