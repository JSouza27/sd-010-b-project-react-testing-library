import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('test NotFound component', () => {
  test('heading h2 existence', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  test('img existence', () => {
    const { getAllByRole } = render(<NotFound />);
    const img = getAllByRole('img')[1];
    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
