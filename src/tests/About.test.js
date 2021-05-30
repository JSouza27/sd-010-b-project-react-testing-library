// Dica de stackoverflow https://stackoverflow.com/questions/65122974/getbyrole-query-for-paragraph-not-working-during-react-testing
import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Requisito 2', () => {
  test('Verifica se a página contém as informações sobre a Pokédex.', () => {
    render(
      <MemoryRouter initialEntries={ ['/About'] }>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const textoH1About = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(textoH1About).toBeInTheDocument();
  });

  test('Verifica se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(
      <MemoryRouter initialEntries={ ['/About'] }>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const textoH2About = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(textoH2About).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <MemoryRouter initialEntries={ ['/About'] }>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const p1About = screen.getByText(
      'This application simulates a Pokédex, a digital',
      ' encyclopedia containing all Pokémons',
    );

    expect(p1About).toBeInTheDocument();

    const p2About = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(p2About).toBeInTheDocument();
  });

  test('Verifica se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(
      <MemoryRouter initialEntries={ ['/About'] }>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const imagem = screen.getByRole('img');
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
