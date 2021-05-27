import React from 'react';

import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests the NotFound component', () => {
  it('verify heading h2 with specific text', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const heading = getByRole('heading', { level: 2 });
    const emoji = getByRole('img', { name: 'Crying emoji' });

    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toContain('Page requested not found');
    expect(emoji).toBeInTheDocument();
    expect(emoji.innerHTML).toBe(' 😭');
  });
});
