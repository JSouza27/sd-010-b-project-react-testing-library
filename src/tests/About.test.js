import React from 'react';
import { About } from '../components';
import renderWithMemoryRouter from './renderWithMemoryRouter';

describe('Requisito 2', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = renderWithMemoryRouter(<About />);

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithMemoryRouter(<About />);

    const primeiroParagrafo = getByText(/This application simulates a Pokédex/i);
    const segundoParagrado = getByText(/One can filter Pokémons by type/i);
    expect(primeiroParagrafo).toBeInTheDocument();
    expect(segundoParagrado).toBeInTheDocument();
  });
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithMemoryRouter(<About />);
    const imagem = getByRole('img', {
      name: /Pokédex/i,
    });
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem.src).toBe(src);
  });
});
