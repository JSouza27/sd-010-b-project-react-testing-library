import React from 'react';

import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente "Not Found"', () => {
  test('Verifica se há um heading com o texto "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const notFoundText = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(notFoundText).toBeInTheDocument();
  });

  test('Verifica se a imagem que aparece na tela é a correta', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const IMG_ALT = /Pikachu crying because the page requested was not found/i;
    const IMG_SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImg = getByAltText(IMG_ALT);

    expect(notFoundImg.src).toBe(IMG_SRC);
  });
});
