import React from 'react';
import { About } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente <About.js /.', () => {
  test('Test se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const phar = getAllByText(/Pokédex/i);
    expect(phar[0]).toBeInTheDocument();
    expect(phar[1]).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining(URL));
  });
});
