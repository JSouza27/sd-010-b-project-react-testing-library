import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testing About.js', () => {
  it('Verifies if the page has pokedex h2 text', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexText = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(pokedexText).toBeInTheDocument();
  });
  it('Verifies if have 2 paragraphs', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const paragraphs = getAllByTestId('paragraph');
    expect(paragraphs.length).toBe(2);
  });
});
