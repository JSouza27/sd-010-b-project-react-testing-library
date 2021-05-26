import React from 'react';
import { About } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Render <About /> component', () => {
  it('renders a heading with the text `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('renders two paragraphs describing the Pokédex application', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/simulates a Pokédex/i);
    const secondParagraph = getByText(/filter Pokémons/i);

    expect(firstParagraph).toHaveTextContent(/simulates a Pokédex/i);
    expect(secondParagraph).toHaveTextContent(/filter Pokémons/i);
  });
});
