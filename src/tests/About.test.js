import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Exercicio 2"', () => {
  it('Renderize um h2 com o texto "About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('Renderize 2 paragrafos, com o texto sobre a Pokedex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphs = getAllByText(/Pokédex/i);
    expect(paragraphs[0]).toBeInTheDocument();
    expect(paragraphs[1]).toBeInTheDocument();
    expect(paragraphs.length).toBe(2);
  });

  it('Renderize a imagem de uma Pokedex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', URL);
  });
});
