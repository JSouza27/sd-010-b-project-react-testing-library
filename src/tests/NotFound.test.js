import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

test('Testa se página contém um h2 com o texto Page requested not found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pagina-nao-existe');

  const h2NotFound = screen.getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });
  expect(h2NotFound).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pagina-nao-existe');
  const notFoundImage = screen.getAllByRole('img');
  expect(notFoundImage[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
