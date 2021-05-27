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

  it('shows the specific image', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const pikachuCrying = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(pikachuCrying).toBeInTheDocument();
    expect(pikachuCrying.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
