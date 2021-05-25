import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Test "NotFound" component', () => {
  it('render not found message', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });

  it('renders image', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundImage = getByRole('img', {
      name: /pikachu crying/i,
    });
    const { src } = notFoundImage;

    expect(notFoundImage).toBeInTheDocument();
    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
