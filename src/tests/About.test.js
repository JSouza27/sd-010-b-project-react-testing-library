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
  it('verifica se tem 2 paragrafos', () => {
    render(<About />);

    const paragrafo1 = 'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons';
    const paragrafo2 = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';
    const par1 = screen.getByText(paragrafo1);
    const par2 = screen.getByText(paragrafo2);

    expect(par1).toBeInTheDocument();
    expect(par2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const imagem = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem.src).toBe(src);
  });
});
