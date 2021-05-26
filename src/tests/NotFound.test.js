import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

test('Testa se página mostra a imagem', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  const imgElement = getAllByRole('img')[1];

  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute('src', imageLink);
});

test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const info1 = 'Page requested not found 😭';

  const h2Element = getByRole('heading');

  expect(h2Element).toBeInTheDocument();
  expect(h2Element).toHaveTextContent(info1);
});
