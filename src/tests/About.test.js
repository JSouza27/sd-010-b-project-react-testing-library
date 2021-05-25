import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('test the About component', () => {
  it('test if the page has a h2 with the text About Pokédex', () => {
    const { getByText, getByRole } = renderWithRouter(<About />);
    const aboutPoke = getByText('About Pokédex');
    expect(aboutPoke).toBeInTheDocument();
    const h2 = getByRole('heading');
    expect(h2).toBe(aboutPoke);
  });
  it('tests if the page has two paragraphs with an text about the Pokédex', async () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/this application simulates a Pokédex/i);
    const secondParagraph = getByText(/one can filter pokémons by/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('tests if the image has the right source', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.outerHTML).toContain(imageSrc);
  });
});
