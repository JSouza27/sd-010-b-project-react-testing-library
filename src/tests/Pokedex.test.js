import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRoute from './renderWithRoute';
import App from '../App';

test('Testando se renderiza o texto "Encountered pokémons" na tela', () => {
  const { getByRole } = renderWithRoute(<App />);

  const heading = getByRole('heading', {
    level: 2,
  });

  expect(heading).toHaveTextContent('Encountered pokémons');
});
