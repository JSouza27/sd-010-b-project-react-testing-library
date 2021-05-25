// test('', () => {});

import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Tests referring to the About Component, and if the page contains informations about Pokedex', () => {
  it('tests the heading', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  it('tests if the page contains 2 paragraphs with text content', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraph1 = getByText(/This application simulates a Pokédex, a digital.../i);
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = getByText(/One can filter Pokémons by type, and see more.../i);
    expect(paragraph2).toBeInTheDocument();
  });

  it('tests the Pokedex image', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<About />);

    const img = getByRole('img', { name: 'Pokédex' });
    const imgSrc = getAllByAltText('Pokédex').map((element) => element.src)[0];

    expect(img).toBeInTheDocument();
    expect(imgSrc).toMatch('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
