import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testa o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se página contém um heading h2', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const altimg = getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(altimg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
