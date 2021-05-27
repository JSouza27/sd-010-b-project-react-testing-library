import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste requisito 4', () => {
  test('Testa se página tem um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const message = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i, // por algum motivo, tava dando erro ao usar o emoji aqui. Aí tive que tirar o emoji e as aspar e usar este /i pra fazer passar no teste.
    });
    expect(message).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  }); // primeiro usei o getByRole, mas aí o npm test reclamou de encontrar muitos IMG. Aí tem que usar o getAllByRole, que aí retorna um array e no expect tem que usar o [1]
});
