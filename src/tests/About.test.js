import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Testing the About.js', () => {
  test('testing if the page has Pokedéx informations', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedexInfo = getByText(/One can filter Pokémons by type/i);

    expect(pokedexInfo).toBeInTheDocument();
  });

  test('testing if the page has a heading h2 with \'About Pokédex\' text', () => {
    const { getByRole } = renderWithRouter(<About />);
    const hasH2Heading = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(hasH2Heading).toBeInTheDocument();
  });

  test('testing if the page has two paragraphs about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons by type/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('testing if the page has two paragraphs about the Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const pokemonImage = getByAltText(/Pokédex/i);

    expect(pokemonImage).toContainHTML('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
