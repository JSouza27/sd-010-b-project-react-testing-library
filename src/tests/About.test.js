import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('2. Teste o componente <About.js /.', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const linkAbout = getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const info = getByText(/This application simulates a Pokédex/i);
    expect(info).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = screen.getByText(/One can filter Pokémons/i);
    expect(paragraph2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
