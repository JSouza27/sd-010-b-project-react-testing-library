import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('Testar o NotFound.js', () => {
  test('Verifica se o titulo "Page requested not found" renderiza', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i, // regex
    })).toBeInTheDocument();
  });

  test('Testando se a imagem do pikachu chorando renderiza', () => {
    render(<NotFound />);
    const pikachuCrying = screen.getByRole('img', {
      name: /Pikachu crying because the page/i,
    });
    expect(pikachuCrying).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
