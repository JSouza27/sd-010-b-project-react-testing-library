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

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const phar = getAllByText(/Pokédex/i);
    expect(phar[0]).toBeInTheDocument();
    expect(phar[1]).toBeInTheDocument();
  });
});
