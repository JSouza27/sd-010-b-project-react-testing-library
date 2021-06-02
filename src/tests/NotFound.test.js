import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import { NotFound } from '../components';

describe('Requisito 4', () => {
  test('Verificar se página contém um heading h2 com o texto.', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const texto = getByText('Page requested not found');
    expect(texto).toBeInTheDocument();
  });

  test('Verifica se página mostra a imagem.', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const imagem = getAllByRole('img')[1];
    expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
