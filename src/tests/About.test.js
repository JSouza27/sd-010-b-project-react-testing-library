import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Checks About', () => {
  it('Checks if the page has heading "h2" with text "About Pokédex"', () => {
    render(<About />);

    const pokemon = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(pokemon).toBeInTheDocument();
  });

  it('Checks if the page has two paragraphs about Pokédex', () => {
    render(<About />);

    const firstParagraph = screen.getByText('This application simulates a Pokédex'
    + ', a digital encyclopedia containing all Pokémons');
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText('One can filter Pokémons by type'
    + ', and see more details for each one of them');
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Checks if the page has the Pokédex image', () => {
    render(<About />);

    const image = screen.getByAltText('Pokédex');
    expect(image.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
