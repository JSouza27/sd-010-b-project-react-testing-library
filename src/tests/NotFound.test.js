import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Testa o componente <NotFound.js />', () => {
  test('Testa se contém um h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getByText((image, { src }) => src === img)).toBeInTheDocument();
  });
});
