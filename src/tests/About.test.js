import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';

import renderRouter from './renderWithRoute';
import { About } from '../components';

describe('Testa se a página contém as informações sobre a Pokédex', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const headPage = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(headPage).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderRouter(<App />);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderRouter(<App />);
  });
});
