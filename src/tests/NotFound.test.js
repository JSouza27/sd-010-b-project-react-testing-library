import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import NotFound from '../components/NotFound';

describe('Requisito 04 = Test NotFound.js', () => {
  test('Teste exibir a mensagem \'Page requested not found 😭\'.', () => {
    renderWithRouter(<NotFound />);
    const altText = 'Pikachu crying because the page requested was not found';

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i, // regex
    })).toBeInTheDocument();

    const img = screen.getByAltText(altText);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
