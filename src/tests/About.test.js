import React from 'react';
import { About } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Renders <About /> component with information about Pokédex', () => {
  it('renders a heading with the text `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('renders two paragraphs describing the Pokédex application', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/simulates a Pokédex/i);
    const secondParagraph = getByText(/filter Pokémons/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('renders a image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImg = getByRole('img');

    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
