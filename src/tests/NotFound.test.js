import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('show if notFound page shows text', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const heading = getByRole('heading');

  expect(heading).toHaveTextContent(/Page requested not found/i);
});
test('show if notFound image exists', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const image = getByAltText('Pikachu crying because the page requested was not found');

  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
