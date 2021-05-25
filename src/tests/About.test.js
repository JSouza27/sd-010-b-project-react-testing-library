import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando a pagina "about"', () => {
  it('Deve ter um heading H2', () => {
    const { getByRole } = render(<About />);
    const h2 = getByRole('heading', { level: 2 });

    expect(h2).toBeInTheDocument();
    expect(h2.textContent).toBe('About Pokédex');
    expect(h2.tagName).toBe('H2');
  });
  it('Deve conter dois paragrafos', () => {
    const { getAllByText } = render(<About />);
    const Paragraphs = getAllByText(/Pokémons/i);

    expect(Paragraphs.length).toBe(2);
    Paragraphs.forEach((tagElement) => {
      expect(tagElement.tagName).toBe('P');
    });
  });
  it('Deve conter uma imagem', () => {
    const { getByRole } = render(<About />);
    const pokedexImage = getByRole('img');
    const urlImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', urlImage);
  });
});
