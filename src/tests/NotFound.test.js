import React from 'react';
import renderWithRouter from '../helpers/renderWithRouters';
import App from '../App';

describe('Teste requisito 4 NotFound.js', () => {
  it('Teste a página contém um heading h2 com texto Page requested not found 😭', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/ash');

    const text = getByRole('heading', { name: /Page requested not found/ });
    expect(text).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/ash');

    const img = getByRole('img', { name: /Pikachu crying/ });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
