import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente Not Found', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const NotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(NotFoundText).toBeInTheDocument();
  });

  test('Teste se página mostra um gif', () => {
    renderWithRouter(<NotFound />);

    const NotFoundGif = screen.getAllByRole('img');
    expect(NotFoundGif[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');

    /* const NotFoundGif = screen.getAllByRole('img');
    expect(NotFoundGif).toHaveAttribute('scr', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'); */
  });
});
