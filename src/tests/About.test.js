import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Testing About.js', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    const titlePokedex = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText, getByAltText } = render(<About />);
    const paragraphOne = getByText(/This application simulates a Pokédex/i);
    expect(paragraphOne).toBeInTheDocument();

    const paragraphTwo = getByText(/One can filter Pokémons by type/i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    const { getByAltText } = render(<About />);
    const imagePokedex = getByAltText('Pokédex');
    expect(imagePokedex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
