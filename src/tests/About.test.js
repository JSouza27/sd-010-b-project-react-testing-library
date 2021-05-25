import React from 'react';
// import { fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import About from '../components/About';

describe('Testa requisito 2', () => {
  it('verifica a existência de um heading H2', () => {
    RenderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /About pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('verifica a existência de dois parágrafos com texto sobre pokédex', () => {
    RenderWithRouter(<About />);
    const firstParagraph = screen.getByText(
      'This application simulates a Pokédex',
      { exact: false },
    );
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = screen.getByText(
      'One can filter Pokémons by type',
      { exact: false },
    );
    expect(secondParagraph).toBeInTheDocument();
  });

  it('verifica a existência de uma imagem', () => {
    RenderWithRouter(<About />);
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
