import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('test About component', () => {
  test('h2 heading', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('if 2 paragraphs exists', () => {
    const { getByText } = render(<About />);
    // WHERE IS THE PARAGRAPH ROLE???
    // const paragraphs = getAllByRole('p');
    // expect(paragraphs.length).toBe(2);
    const paragrapth1 = getByText(/This application simulates/i);
    expect(paragrapth1).toBeInTheDocument();
    const paragrapth2 = getByText(/One can filter Pokémons by/i);
    expect(paragrapth2).toBeInTheDocument();
  });

  test('img', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // linha 28 baseada em https://github.com/tryber/sd-09-project-react-testing-library/pull/74/files
  });
});
