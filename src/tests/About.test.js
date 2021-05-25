import React from 'react';
import renderWithRouter from '../helpers/renderWithRouters';
import { About } from '../components';

describe('Testa requisito 2 About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPokedex = getByRole('heading', {
      level: 2, name: 'About Pokédex',
    });

    expect(aboutPokedex).toBeInTheDocument();
  });
});
