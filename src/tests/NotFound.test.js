import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('se página contém um heading h2 com o texto Page requested not found', () => {
  const { getByRole } = render(<NotFound />);
  const heading = getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/Page requested not found/i);
});

test('Verifica se a página contém uma imagem com uma determinada Url', () => {
  const { getByAltText } = render(<NotFound />);
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toContain(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
