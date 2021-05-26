import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Test About Component', () => {
  it('should contain a heading with about pokedex', () => {
    const { getByRole, getByText } = renderWithRouter(<About />);

    const head = getByRole('heading', { level: 2 });
    expect(head).toBeTruthy();

    const content = getByText('About Pokédex');
    expect(content).toBeInTheDocument();
  });

  it('should contain 2 paragraphs', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0]).toBeInTheDocument();
    expect(paragraphs[1]).toBeInTheDocument();
  });

  it('should contain a img with the right src url', () => {
    renderWithRouter(<About />);
    const img = document.querySelector('img').src;
    expect(img).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
