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
});
