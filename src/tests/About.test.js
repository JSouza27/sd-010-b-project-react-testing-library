import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('testar o componente about', () => {
  it('Renderiza componente about', () => {
    render(<About />);
    const getTitulo = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(getTitulo).toBeInTheDocument();
  });
  it('verifica se a pagina tem p sobre a pokedex', () => {
    const { getByText } = render(<About />);

    const primeiroParagrafo = getByText(/This application simulates a Pokédex/i);
    const segundoParagrado = getByText(/One can filter Pokémons by type/i);

    expect(primeiroParagrafo).toBeInTheDocument();
    expect(segundoParagrado).toBeInTheDocument();
  });
  it('testa se a pagin contem img pokedex', () => {
    const { getByRole } = render(<About />);
    const imagem = getByRole('img', {
      name: /Pokédex/i,
    });
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem.src).toBe(src);
  });
});
