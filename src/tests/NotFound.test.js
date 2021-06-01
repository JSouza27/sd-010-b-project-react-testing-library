import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

test('Se página contém um h2 com o texto Page requested not found', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  const pageNotFound = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(pageNotFound).toBeInTheDocument();
});
test('Teste se página mostra a imagem', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = getByAltText(/Pikachu crying because the page requested was not found/i);

  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
