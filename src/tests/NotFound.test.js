import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';

import NotFound from '../components/NotFound';

describe('Test page not found', () => {
  test('if the page contains h2 with text Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const pageTitle = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageTitle).toBeInTheDocument();
  });
});
