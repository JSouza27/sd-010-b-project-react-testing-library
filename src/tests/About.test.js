import React from 'react';
import { render } from '@testing-library/react';

import About from '../components/About';

describe('Tests the About component.', () => {
  it('tests if the page contains the info about Pokédex', () => {
    const { getByRole } = render(<About />);

    const aboutTitle = getByRole('heading', { level: 2 });

    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle.innerHTML).toBe('About Pokédex');
  });
  it('', () => {
    const { getByRole } = render(<About />);

    const h2 = getByRole('heading', { level: 2 });

    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('test if the page have two p tags with text about Pokédex', () => {
    const { getAllByText } = render(<About />);

    const pTags = getAllByText(/Pokémons/i);

    expect(pTags).toHaveLength(2);
  });

  it('tests whether page has the specific image.', () => {
    const { getByAltText } = render(<About />);

    const img = getByAltText('Pokédex');

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
