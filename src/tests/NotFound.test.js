import { render, screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';

describe('', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const notFoundMessage = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem correta', () => {
    render(<NotFound />);

    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const img = screen.getAllByRole('img');

    expect(img[1]).toHaveAttribute('src', imgUrl);
  });
});
