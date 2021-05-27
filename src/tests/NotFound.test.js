import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando toda a aplicação da tela Not found', () => {
  it('imagem de não encontrado', () => {
    renderWithRouter(<NotFound />);
    const crying = screen.getByAltText(/crying/i);

    expect(crying.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
  it('Verifica se o título de não encontrado aparece na tela', () => {
    renderWithRouter(<NotFound />);
    const nome = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(nome).toBeInTheDocument();
  });
});
