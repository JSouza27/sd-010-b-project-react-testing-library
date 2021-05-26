import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Teste se página contém um heading h2', () => {
  render(
    <MemoryRouter initialEntries={ ['/notFound'] }>
      <App />
    </MemoryRouter>,
  );
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(h2).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  render(
    <MemoryRouter initialEntries={ ['/notFound'] }>
      <App />
    </MemoryRouter>,
  );
  const img = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
