import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente About.js .', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<App />);

    const AboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(AboutLink);

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />);

    const AboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(AboutLink);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);

    expect(firstParagraph && secondParagraph).toBeInTheDocument();
  });

  test('Se a página contem a imagem', () => {
    renderWithRouter(<App />);

    const AboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(AboutLink);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
