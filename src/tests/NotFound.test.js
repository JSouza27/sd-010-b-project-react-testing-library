// test('', () => {});
import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests the NotFound Component', () => {
  it('tests the heading', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2, name: 'Page requested not found Crying emoji' });
    expect(heading).toBeInTheDocument();
  });

  it('tests the Pokedex image', () => {
    const { getAllByAltText } = renderWithRouter(<NotFound />);
    const img = getAllByAltText('Pikachu crying because the page requested was not found')
      .map((element) => element.src)[0];
    expect(img).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
