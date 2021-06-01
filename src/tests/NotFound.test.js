import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const expected = getByRole('heading', { name: /page requested not found/i });

    expect(expected).toBeInTheDocument();
  });

  test('se página mostra a imagem alvo', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const targetImage = getAllByRole('img');
    const targetSRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(targetImage[1]).toHaveAttribute('src', targetSRC);
  });
});
