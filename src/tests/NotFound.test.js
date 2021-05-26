import React from 'react';
import { NotFound } from '../components';
import renderWithMemoryRouter from './renderWithMemoryRouter';

describe('Requisito 4', () => {
  it('Testa se página contém um heading h2', () => {
    const { getByText, getByRole } = renderWithMemoryRouter(<NotFound />);
    const emoji = getByRole('img', { name: 'Crying emoji' });
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });
  it('Testa se página mostra a imagem', () => {
    const { getByRole } = renderWithMemoryRouter(<NotFound />);
    const imagem = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagem.src).toBe(src);
  });
});
