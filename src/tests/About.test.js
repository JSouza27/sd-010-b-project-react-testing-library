import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../components/About';

import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js /.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const info = screen.getByText('ication simulates a Pokédex', { exact: false });
    /* { exact: false }https://testing-library.com/docs/queries/about/ */
    expect(info).toBeInTheDocument();
  });

  test('Testa se a página contém um h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const textH2 = screen.getByRole('heading', { name: /about pokédex/i });
    expect(textH2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText('ication simulates a Pokédex', {
      exact: false });
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText('Pokémons by type,', { exact: false });
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const getImage = screen.getByRole('img', { name: /pokédex/i });
    expect(getImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    /* fonte para uso do toHaveAttribute <https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f> */
  });
});
