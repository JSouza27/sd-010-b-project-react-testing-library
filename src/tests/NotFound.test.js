import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import NotFound from '../components/NotFound';

describe('testa requisito 4', () => {
  it('verifica a existência de um heading H2', () => {
    RenderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('verifica a existência de uma imagem', () => {
    RenderWithRouter(<NotFound />);
    const img = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(img).toHaveAttribute(
      'src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
