import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

// test('', () => {});
describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
