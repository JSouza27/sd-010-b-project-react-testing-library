import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('4. Teste o componente `<NotFound.js />', () => {
  it('Teste pági contém heading h2 texto `Page requested not found 😭`;', () => {
    const { getByText, getByRole } = renderWithRouter(<NotFound />);
    const emoji = getByRole('img', { name: 'Crying emoji' });
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const imagem = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagem.src).toBe(src);
  });
});
