import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando página Not found', () => {
  it('Testa se a página contém um heading h2 com texto page requested not found', () => {
    const { getByRole, getByLabelText } = render(<NotFound />);
    const cryingEmoji = getByLabelText(/Crying emoji/i);
    const h2 = getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(h2).toBeInTheDocument();
    expect(cryingEmoji).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem do Pikachu chorando', () => {
    const { getAllByRole } = render(<NotFound />);
    const pikachuCrying = getAllByRole('img');
    expect(pikachuCrying[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
