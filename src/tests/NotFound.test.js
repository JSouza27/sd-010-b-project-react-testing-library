import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test of not found page', () => {
  it('Test if the page have a h2 with text', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);
    history.push('/page-not-existent');
    expect(
      getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      }),
    ).toBeInTheDocument();
  });

  it('Test if this page have a img', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);
    history.push('/page-not-existent');
    const imgOfNotFound = getByRole('img', { name: /Pikachu crying because the page/i });
    expect(imgOfNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
