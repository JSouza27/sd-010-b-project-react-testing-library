import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Teste o componente <About.js />.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const aboutTitle = screen.getByRole('heading', {
      name: /About pokédex/i,
      level: 2,
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    const p1text = 'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons';
    const paragraph1 = screen.getByText(p1text);

    expect(paragraph1).toBeInTheDocument();

    const p2text = 'One can filter Pokémons by type, '
      + 'and see more details for each one of them';
    const paragraph2 = screen.getByText(p2text);

    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem correta da pokedex', () => {
    render(<About />);

    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const img = screen.getByRole('img');
    expect(img.src).toBe(imgUrl);
  });
});
