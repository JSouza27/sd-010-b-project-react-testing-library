import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Requirement 4', () => {
  test('Not Found Page', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = 'Page requested not found';
    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toHaveTextContent(notFound);
  });

  test('There are a <img> of Pikachu', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getAllByRole('img');
    console.log(img);
    expect(img[1].src).toContain(imgUrl);
  });
});
