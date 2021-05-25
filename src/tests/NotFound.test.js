import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Requisito 4', () => {
  it('Testa se página contém um heading h2', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const emoji = getByRole('img', { name: 'Crying emoji' });
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });
  it('Testa se página mostra a imagem', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const imagem = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagem.src).toBe(src);
  });
});
