import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('tests the <About /> component', () => {
  test('information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstInformation = getByText(/This application simulates a Pokédex/i);
    expect(firstInformation).toBeInTheDocument();
    const secondInformation = getByText(/One can filter Pokémons by type/i);
    expect(secondInformation).toBeInTheDocument();
  });
  test('heading with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });
  test('if the page contains two paragraphs with text about Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const twoParagraphs = getAllByText(/Pokémons/i);
    expect(twoParagraphs.length).toBe(2);
  });
  test('if the page contains an image of a Pokédex', () => {
    renderWithRouter(<About />);
    const image = document.querySelector('img');
    expect(image.src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
