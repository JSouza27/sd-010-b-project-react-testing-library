import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testes do componente <About.js/>', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const h1 = screen.getByText('this application simulates a pokédex', { exact: false });
    expect(h1).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const h2 = screen.getByRole('heading', { level: 2, name: /about pokédex/i });

    expect(h2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const firstParagraph = screen.getByText(
      'This application simulates a Pokédex', { exact: false },
    );
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(
      'This application simulates a Pokédex', { exact: false },
    );
    expect(secondParagraph).toBeInTheDocument();
  });
  test('Teste se a página contém uma determinada imagem de uma Pokédex', () => {
    RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const specificImg = screen.getByRole('img', {
      name: /Pokédex/i,
    });

    expect(specificImg).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
