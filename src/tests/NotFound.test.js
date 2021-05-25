import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('A contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    }));
  });

  test('Teste se página mostra a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const image = getAllByRole('img');
    const urlImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    // console.log(image);

    image.forEach((imagem) => {
      if (imagem.tagName === 'img') {
        expect(imagem).toBeInTheDocument();
        expect(imagem).toHaveAttribute('src', urlImage);
      }
    });
  });
});
