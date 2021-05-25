import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Testing about component', () => {
  it('testing if there is h2 element with "about pokedex" text', () => {
    const { getByRole } = render(<About />);
    const h2Element = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(h2Element).toBeInTheDocument();
  });

  it('testing the quantity of paragraphs', () => {
    const { getByText } = render(<About />);
    const firstParagraph = getByText('This application simulates a Pokédex'
    + ', a digital encyclopedia containing all Pokémons');
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = getByText('One can filter Pokémons by type'
    + ', and see more details for each one of them');
    expect(secondParagraph).toBeInTheDocument();
  });

  it('testing if component has a pokedex image and the src of the image', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img', {
      name: /pokédex/i,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
