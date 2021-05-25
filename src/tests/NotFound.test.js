import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Teste da página Not Found', () => {
  test('Teste se página contém um heading', () => {
    render(<NotFound />);

    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found crying emoji/i,
    });

    expect(textNotFound).toBeInTheDocument();
  });

  test('Teste se a página contém uma image', () => {
    render(<NotFound />);

    const imageNotFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
