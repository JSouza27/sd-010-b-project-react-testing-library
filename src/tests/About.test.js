import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('testing component About.js', () => {
  test('if contain text About Pokédex', () => {
    const { getByRole } = render(<About />);
    const about = getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(about).toBeInTheDocument();
  });
  test('if contain two paragraphs', () => {
    const { getByText } = render(<About />);
    const firstPart = 'This application simulates a Pokédex, ';
    const secondPart = 'a digital encyclopedia containing all Pokémons';
    const textOne = getByText(firstPart + secondPart);
    expect(textOne).toBeInTheDocument();
  });
  test('if contain image', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
