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
});
