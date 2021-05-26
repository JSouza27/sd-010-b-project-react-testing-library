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
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphs = getAllByText(/pok[eé]mons/i);
    expect(paragraphs.length).toBe(2);
  });
  it('Verifies if have an img if an specific src', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
