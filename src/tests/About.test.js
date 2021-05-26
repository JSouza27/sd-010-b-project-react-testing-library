import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Requirement 2', () => {
  test('Renders a <h2> with the text `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  test('There are two <p> about Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const p = getAllByText(/Pokémons/i);
    expect(p[0]).toBeInTheDocument();
    expect(p[1]).toBeInTheDocument();
  });

  // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  test('There are a <img> of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toContain(imgUrl);
  });
});
