import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testes do requisito 4', () => {
  it('Verifica se contém um heading h2 com o texto Page requested not found ', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const headingNotFound = getByRole('heading', {
      level: 2,
      name: /page requested not found /i,
    });

    expect(headingNotFound).toBeInTheDocument();
  });

  it('Verifica se a página contém uma imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const text = 'Pikachu crying because the page requested was not found';
    const imgAlt = getByAltText(text);

    expect(imgAlt).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
