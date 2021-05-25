import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testa o componente <NotFound.js />', () => {
  test('Teste se página contém um h2 com o texto "Page requested not found"', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/nãoexiste');

    const text = screen.getByRole(
      'heading', { name: /Page requested not found/i },
    );

    expect(text).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/not-found');

    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(img).toHaveAttribute(
      'src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
