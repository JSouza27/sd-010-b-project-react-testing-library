import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Test NotFound Component', () => {
  it('should contain a heading with "Page requested not found"', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFound />);

    const head = getByRole('heading', { level: 2 });
    expect(head).toBeTruthy();

    const content = getByText('Page requested not found');
    expect(content).toBeInTheDocument();
  });

  it('should contain a img with the right src url', () => {
    renderWithRouter(<NotFound />);
    const img = document.querySelector('img').src;
    expect(img).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
