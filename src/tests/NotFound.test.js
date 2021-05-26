import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('tests the NotFound component', () => {
  it('tests if there is a heading h2 with the the right text', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundHeader = getByText(/Page requested not found/i);
    expect(notFoundHeader).toBeInTheDocument();
    expect(notFoundHeader.nodeName).toBe('H2');
  });
  it('test if the right image is rendered', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const allImgs = getAllByRole('img');
    const cryingPikachu = allImgs[1];
    const cryingPikachuLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(cryingPikachu).toBeInTheDocument();
    expect(cryingPikachu.outerHTML).toContain(cryingPikachuLink);
  });
});
