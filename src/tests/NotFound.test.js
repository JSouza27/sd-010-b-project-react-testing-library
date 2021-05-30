import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import NotFound from '../components/NotFound';

test('Teste se há  h2 com o texto Page requested not found 😭', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const headingTwo = getByRole('heading',
    { level: 2, name: 'Page requested not found Crying emoji' });
  expect(headingTwo).toBeInTheDocument();
});
test('Teste se página mostra a imagem', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const image = getByRole('img',
    { name: 'Pikachu crying because the page requested was not found' });
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
