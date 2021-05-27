import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/123');

    const textNotFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(textNotFound).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    history.push('/123');

    const imgNotFound = getAllByRole('img');
    expect(imgNotFound[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
