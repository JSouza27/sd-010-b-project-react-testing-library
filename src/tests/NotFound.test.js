import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando toda a aplicação da tela NotFound', () => {
  it('Verifica se o título aparece na tela', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se a imagem NotFound está na tela', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying/i);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
