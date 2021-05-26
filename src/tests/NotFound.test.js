import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testando o componente NotFound.js ', () => {
  test('Verifica se contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const notFound = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
